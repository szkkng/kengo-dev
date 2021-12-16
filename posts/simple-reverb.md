---
title: 'Simple Reverb - JUCE DSP module'
date: '2021-10-18'
thumbnail: '/images/simple-reverb/simple-reverb.png'
---

## Introduction

In this tutorial, I will show you how to make a simple reverb with the JUCE DSP module.

![simple-reverb.png](/images/simple-reverb/simple-reverb.png)

### Prerequisites

Launch Projucer, create a new project named SimplePlugin, and enable juce_dsp so that you can use the JUCE DSP module.

![new-project.png](/images/simple-reverb/new-project.png)
![add-dsp-module.png](/images/simple-reverb/add-dsp-module.png)

Then create CPP and Header files that you will need for this tutorial by selecting "Add New CPP & Header File" or "Add New Header File" as shown below:

![add-new-files.png](/images/simple-reverb/add-new-files.png)
![added-new-files.png](/images/simple-reverb/added-new-files.png)

## DSP

This chapter explains the DSP part of Simple Reverb.

### APVTS

I recommend using APVTS(AudioProcessorValueTreeState) to manage parameters because it is so much simpler than the traditional way. Prepare the APVTS object as shown below:

```c++
class SimpleReverbAudioProcessor  : public juce::AudioProcessor
{
public:
・・・
    juce::AudioProcessorValueTreeState::ParameterLayout createParameterLayout();

    juce::AudioProcessorValueTreeState apvts { *this, nullptr, "Parameters", createParameterLayout() };
```

Implement all the parameters that you want to manage in APVTS in createParameter(). In this case, we will create a reverb, so we will use [juce::dsp::Reverb::Parameters](https://docs.juce.com/master/classdsp_1_1Reverb.html#a67582b7d70a6a0f444be8e3649b184b3) ([juce::Reverb::Parameters](https://docs.juce.com/master/structReverb_1_1Parameters.html)):

- [roomSize](https://docs.juce.com/master/structReverb_1_1Parameters.html#a31a5e2e56f91cb29e902e045960218a8)
- [damping](https://docs.juce.com/master/structReverb_1_1Parameters.html#afbbd3f114c878f0a864205aa66d47f6f)
- [wetLevel](https://docs.juce.com/master/structReverb_1_1Parameters.html#ae029e68c8dc8fa0acb34373237377fec)
- [dryLevel](https://docs.juce.com/master/structReverb_1_1Parameters.html#add75191e7a163d95cd807cbc72fa192c)
- [width](https://docs.juce.com/master/structReverb_1_1Parameters.html#a2104c314f4804e3ff6e5cc7d524c3b1d)
- [freezeMode](https://docs.juce.com/master/structReverb_1_1Parameters.html#a394c3bfbd67ad681222410952dbed0c6)

These parameters can be made to correspond to knobs one by one, but it is inconvenient to have separate Dry and Wet parameters, so they are combined into one as "dw". Also, I personally think it is cooler to display the parameters as %. These implementations are shown below:

```c++
juce::AudioProcessorValueTreeState::ParameterLayout SimpleReverbAudioProcessor::createParameterLayout()
{
    juce::AudioProcessorValueTreeState::ParameterLayout layout;

    layout.add (std::make_unique<juce::AudioParameterFloat> ("size",
                                                             "size",
                                                             juce::NormalisableRange<float> (0.0f, 1.0f, 0.001f, 1.0f),
                                                             0.5f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                if (value * 100 < 10.0f)
                                                                    return juce::String (value * 100, 2);
                                                                else if (value * 100 < 100.0f)
                                                                    return juce::String (value * 100, 1);
                                                                else
                                                                    return juce::String (value * 100, 0); },
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("damp",
                                                             "damp",
                                                             juce::NormalisableRange<float> (0.0f, 1.0f, 0.001f, 1.0f),
                                                             0.5f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                if (value * 100 < 10.0f)
                                                                    return juce::String (value * 100, 2);
                                                                else if (value * 100 < 100.0f)
                                                                    return juce::String (value * 100, 1);
                                                                else
                                                                    return juce::String (value * 100, 0); },
                                                             nullptr));


    layout.add (std::make_unique<juce::AudioParameterFloat> ("width",
                                                             "width",
                                                             juce::NormalisableRange<float> (0.0f, 1.0f, 0.001f, 1.0f),
                                                             0.5f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                if (value * 100 < 10.0f)
                                                                    return juce::String (value * 100, 2);
                                                                else if (value * 100 < 100.0f)
                                                                    return juce::String (value * 100, 1);
                                                                else
                                                                    return juce::String (value * 100, 0); },
                                                            nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("dw",
                                                             "dw",
                                                             juce::NormalisableRange<float> (0.0f, 1.0f, 0.001f, 1.0f),
                                                             0.5f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                if (value * 100 < 10.0f)
                                                                    return juce::String (value * 100, 2);
                                                                else if (value * 100 < 100.0f)
                                                                    return juce::String (value * 100, 1);
                                                                else
                                                                    return juce::String (value * 100, 0); },
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterBool> ("freeze", "freeze", false));

    return layout;
}
```

### juce::dsp::Reverb

Now that the APVTS is ready, we will implement the Reverb part. Let’s create an object of juce::dsp::Reverb::Parameters, which was introduced earlier. Also, create two juce::dsp::Reverb objects to support stereo channels.

```c++
class SimpleReverbAudioProcessor  : public juce::AudioProcessor
{
・・・
private:
    juce::dsp::Reverb::Parameters params;
    juce::dsp::Reverb leftReverb, rightReverb;
    //==============================================================================
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (SimpleReverbAudioProcessor)
};
```

Next, prepare a juce::dsp::ProcessSpec object to hold the information necessary to initialize the Reverb object you have created:

```c++
void SimpleReverbAudioProcessor::prepareToPlay (double sampleRate, int samplesPerBlock)
{
    juce::dsp::ProcessSpec spec;

    spec.sampleRate = sampleRate;
    spec.maximumBlockSize = samplesPerBlock;
    spec.numChannels = 1;

    leftReverb.prepare (spec);
    rightReverb.prepare (spec);
}
```

Then, we will implement the audio processing part. As mentioned earlier, we’ll combine them into one as "dw", so we’ll give it a little twist. It means that the value of dry should be the maximum value of 1 minus the value of wet. Like this:

```c++
void SimpleReverbAudioProcessor::processBlock (juce::AudioBuffer<float>& buffer, juce::MidiBuffer& midiMessages)
{
    juce::ScopedNoDenormals noDenormals;
    auto totalNumInputChannels  = getTotalNumInputChannels();
    auto totalNumOutputChannels = getTotalNumOutputChannels();

    for (auto i = totalNumInputChannels; i < totalNumOutputChannels; ++i)
        buffer.clear (i, 0, buffer.getNumSamples());

    params.roomSize   = *apvts.getRawParameterValue ("size");
    params.damping    = *apvts.getRawParameterValue ("damp");
    params.width      = *apvts.getRawParameterValue ("width");
    params.wetLevel   = *apvts.getRawParameterValue ("dw");
    params.dryLevel   = 1.0f - *apvts.getRawParameterValue ("dw");
    params.freezeMode = *apvts.getRawParameterValue ("freeze");

    leftReverb.setParameters (params);
    rightReverb.setParameters (params);

    juce::dsp::AudioBlock<float> block (buffer);

    auto leftBlock = block.getSingleChannelBlock (0);
    auto rightBlock = block.getSingleChannelBlock (1);

    juce::dsp::ProcessContextReplacing<float> leftContext (leftBlock);
    juce::dsp::ProcessContextReplacing<float> rightContext (rightBlock);

    leftReverb.process (leftContext);
    rightReverb.process (rightContext);
}
```

### GenericAudioProcessorEditor

Now, the implementation of the dsp part is complete.
By editing as show below, you can check the operation with the UI provided by default in JUCE.
Don't forget to change it back after checking.

```c++
juce::AudioProcessorEditor* SimpleReverbAudioProcessor::createEditor()
{
//    return new SimpleReverbAudioProcessorEditor (*this);
    return new juce::GenericAudioProcessorEditor (*this);
}
```

![generic-editor.png](/images/simple-reverb/generic-editor.png)

## UI

This chapter explains the UI part of Simple Reverb.

### CustomLookAndFeel

First, we will customize LookAndFeel, which is the foundation of the UI component we will create, and edit CustomLookAndFeel.h/.cpp file.

The implementation details of the header file are as shown below:

```c++
#pragma once

#include <JuceHeader.h>

class CustomLookAndFeel : public juce::LookAndFeel_V4
{
public:
    CustomLookAndFeel(){};
    ~CustomLookAndFeel(){};

    juce::Slider::SliderLayout getSliderLayout (juce::Slider& slider) override;

    void drawRotarySlider (juce::Graphics&, int x, int y, int width, int height,
                           float sliderPosProportional, float rotaryStartAngle,
                           float rotaryEndAngle, juce::Slider&) override;

    juce::Label* createSliderTextBox (juce::Slider& slider) override;

    juce::Font getTextButtonFont (juce::TextButton&, int buttonHeight) override;

    void drawButtonBackground (juce::Graphics& g, juce::Button& button,
                               const juce::Colour& backgroundColour,
                               bool shouldDrawButtonAsHighlighted,
                               bool shouldDrawButtonAsDown) override;

private:
    juce::Colour blue      = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);
    juce::Colour offWhite  = juce::Colour::fromFloatRGBA (0.83f, 0.84f, 0.9f,  1.0f);
    juce::Colour grey      = juce::Colour::fromFloatRGBA (0.42f, 0.42f, 0.42f, 1.0f);
    juce::Colour blackGrey = juce::Colour::fromFloatRGBA (0.2f,  0.2f,  0.2f,  1.0f);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (CustomLookAndFeel);
};
```

I will explain the member functions to be overridden one by one.

#### getSliderLayout()

[getSliderLayout()](https://docs.juce.com/master/classLookAndFeel__V2.html#a5bdac020795c695459eefdd7b911814e) is the function that sets the basic placement of the slider. In other words, it determines how big and where the slider and its text box will be placed.

Simple Reverb’s RotarySlider is designed to place a text box in the center:

```c++
juce::Slider::SliderLayout CustomLookAndFeel::getSliderLayout (juce::Slider& slider)
{
    auto localBounds = slider.getLocalBounds();

    juce::Slider::SliderLayout layout;

    layout.textBoxBounds = localBounds;
    layout.sliderBounds = localBounds;

    return layout;
}
```

#### drawRotarySlider()

[drawRotarySlider()](https://docs.juce.com/master/classLookAndFeel__V4.html#a853e1ecd2b3f1cf687348e699e83e5b4) is a function deeply involved in the depiction part of RotarySlider. It determines how big the arc should be, what color it should be drawn in, and so on.

The RotarySlider of Simple Reverb is implemented as follows:

```c++
void CustomLookAndFeel::drawRotarySlider (juce::Graphics& g, int x, int y, int width, int height, float sliderPos,
                                          const float rotaryStartAngle, const float rotaryEndAngle, juce::Slider& slider)
{
    auto fill = slider.findColour (juce::Slider::rotarySliderFillColourId);

    auto bounds = juce::Rectangle<float> (x, y, width, height).reduced (2.0f);
    auto radius = juce::jmin (bounds.getWidth(), bounds.getHeight()) / 2.0f;
    auto toAngle = rotaryStartAngle + sliderPos * (rotaryEndAngle - rotaryStartAngle);
    auto lineW = radius * 0.085f;
    auto arcRadius = radius - lineW * 1.5f;

    juce::Path backgroundArc;
    backgroundArc.addCentredArc (bounds.getCentreX(),
                                 bounds.getCentreY(),
                                 arcRadius,
                                 arcRadius,
                                 0.0f,
                                 rotaryStartAngle,
                                 rotaryEndAngle,
                                 true);

    g.setColour (blackGrey);
    g.strokePath (backgroundArc, juce::PathStrokeType (lineW, juce::PathStrokeType::curved, juce::PathStrokeType::rounded));

    juce::Path valueArc;
    valueArc.addCentredArc (bounds.getCentreX(),
                            bounds.getCentreY(),
                            arcRadius,
                            arcRadius,
                            0.0f,
                            rotaryStartAngle,
                            toAngle,
                            true);

    auto alpha = 0.1f + (float) slider.getValue() * 0.9f;
    auto brightness = 0.4f + (float) slider.getValue() * 0.6f;

    g.setColour (fill.withAlpha (alpha).brighter (brightness));
    g.strokePath (valueArc, juce::PathStrokeType (lineW, juce::PathStrokeType::curved, juce::PathStrokeType::rounded));

    auto thumbWidth = lineW * 2.0f;

    juce::Path thumb;
    thumb.addRectangle (-thumbWidth / 2, -thumbWidth / 2, thumbWidth, radius + lineW);

    g.setColour (offWhite);
    g.fillPath (thumb, juce::AffineTransform::rotation (toAngle + 3.12f).translated (bounds.getCentre()));

    g.fillEllipse (bounds.reduced (8.0f));
}
```

#### createSliderTextBox()

[createSliderTextBox()](https://docs.juce.com/master/classLookAndFeel__V4.html#ab08d5aa50750b1989c99a052073f96b1) is the function involved in depicting the slider text box. We have just overridden getSliderLayout so that the text box is placed in the center of the RotarySlider, but this will interfere with dragging. To allow dragging even on the text box, we can pass false to setInterceptsMouseClicks():

```c++
juce::Label* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
    auto* l = new juce::Label();
    l->setJustificationType (juce::Justification::centred);
    l->setColour (juce::Label::textColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::textWhenEditingColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::outlineWhenEditingColourId, slider.findColour (juce::Slider::textBoxOutlineColourId));
    l->setInterceptsMouseClicks (false, false);
    l->setFont (15);

    return l;
}
```

#### getTextButtonFont()

[getTextButtonFont()](https://docs.juce.com/master/classLookAndFeel__V4.html#a74afbc74da0036ed8eae41dfc6a2fd85) is a function related to the font part of the TextButton object. We override this function for “∞”.

```c++
juce::Font CustomLookAndFeel::getTextButtonFont (juce::TextButton&, int buttonHeight)
{
    return juce::Font { "Avenir Next Medium", 90.f, 0 };
}
```

#### drawButtonBackground()

[drawButtonBackground()](https://docs.juce.com/master/classLookAndFeel__V4.html#a5ecb659ea592de3d703b7eff40e5fb89) is a function related to drawing the background part of a TextButton.
In this case, we don’t need to draw the border and background of “∞”, so we clear it.

```c++
void CustomLookAndFeel::drawButtonBackground (juce::Graphics& g, juce::Button& button, const juce::Colour& backgroundColour,
                                              bool shouldDrawButtonAsHighlighted, bool shouldDrawButtonAsDown)
{
}
```

### RotarySlider

The implementation of the header file is shown below:

```c++
#pragma once

#include <JuceHeader.h>
#include "CustomLookAndFeel.h"

class RotarySlider  : public juce::Slider
{
public:
    RotarySlider();
    ~RotarySlider() override;

    void paint (juce::Graphics& g) override;

    void mouseDown (const juce::MouseEvent& event) override;
    void mouseUp (const juce::MouseEvent& event) override;

private:
    CustomLookAndFeel customLookAndFeel;

    juce::Colour blue      = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f, 1.0f);
    juce::Colour grey      = juce::Colour::fromFloatRGBA (0.42f, 0.42f, 0.42f, 1.0f);
    juce::Colour blackGrey = juce::Colour::fromFloatRGBA (0.2f,  0.2f,  0.2f, 1.0f);
    juce::Colour offWhite  = juce::Colour::fromFloatRGBA (0.83f, 0.84f, 0.9f, 1.f);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (RotarySlider)
};
```

#### Constructor / Destructor

In this constructor, the following member functions are called to configure the details.

```c++
RotarySlider::RotarySlider()
{
    setSliderStyle (juce::Slider::SliderStyle::RotaryVerticalDrag);
    setTextBoxStyle (juce::Slider::TextBoxBelow, true, 0, 0);
    setLookAndFeel (&customLookAndFeel);
    setColour (juce::Slider::rotarySliderFillColourId, blue);
    setColour (juce::Slider::textBoxTextColourId, blackGrey);
    setColour (juce::Slider::textBoxOutlineColourId, grey);
    setVelocityBasedMode (true);
    setVelocityModeParameters (0.5, 1, 0.09, false);
    setRotaryParameters (juce::MathConstants<float>::pi * 1.25f,
                         juce::MathConstants<float>::pi * 2.75f,
                         true);
    setWantsKeyboardFocus (true);
    setTextValueSuffix (" %");
}

RotarySlider::~RotarySlider()
{
    setLookAndFeel (nullptr);
}
```

#### paint()

It is implemented so that when the RotarySlider gets the focus, it will be marked as locked on:

```c++
void RotarySlider::paint (juce::Graphics& g)
{
    juce::Slider::paint (g);

    if (hasKeyboardFocus (false))
    {
        auto length = getHeight() > 15 ? 5.0f : 4.0f;
        auto thick  = getHeight() > 15 ? 3.0f : 2.5f;

        g.setColour (findColour (juce::Slider::textBoxOutlineColourId));

        //          fromX       fromY        toX                  toY
        g.drawLine (0,          0,           0,                   length,               thick);
        g.drawLine (0,          0,           length,              0,                    thick);
        g.drawLine (0,          getHeight(), 0,                   getHeight() - length, thick);
        g.drawLine (0,          getHeight(), length,              getHeight(),          thick);
        g.drawLine (getWidth(), getHeight(), getWidth() - length, getHeight(),          thick);
        g.drawLine (getWidth(), getHeight(), getWidth(),          getHeight() - length, thick);
        g.drawLine (getWidth(), 0,           getWidth() - length, 0,                    thick);
        g.drawLine (getWidth(), 0,           getWidth(),          length,               thick);
    }
}
```

#### mouseDown() / mouseUp()

It is implemented so that the mouse pointer disappears when you click and drag the mouse, and it appears when you release the mouse:

```c++
void RotarySlider::mouseDown (const juce::MouseEvent& event)
{
    juce::Slider::mouseDown (event);

    setMouseCursor (juce::MouseCursor::NoCursor);
}

void RotarySlider::mouseUp (const juce::MouseEvent& event)
{
    juce::Slider::mouseUp (event);

    juce::Desktop::getInstance().getMainMouseSource().setScreenPosition (event.source.getLastMouseDownPosition());
    setMouseCursor (juce::MouseCursor::NormalCursor);
}
```

### NameLabel

This class is customized for the labels that correspond to each knob. If we don’t prepare this, we will have to write the same code multiple times, which is not very beautiful. The amount of code to be written is small, so just create a new header file and implement it as shown below:

```c++
#pragma once

#include <JuceHeader.h>

class NameLabel  : public juce::Label
{
public:
	NameLabel()
	{
		setFont (20.0f);
		setColour (juce::Label::textColourId, grey);
		setJustificationType (juce::Justification::centred);
	}

	~NameLabel(){}

private:
	juce::Colour grey = juce::Colour::fromFloatRGBA (0.42f, 0.42f, 0.42f, 1.0f);

};
```

### PluginEditor

Now, we have completed the implementation of the UI components that make up Simple Reverb. we just need to implement the PluginEditor part.

```c++
#pragma once

#include <JuceHeader.h>
#include "PluginProcessor.h"
#include "CustomLookAndFeel.h"
#include "RotarySlider.h"
#include "NameLabel.h"

//==============================================================================
/**
*/
class SimpleReverbAudioProcessorEditor  : public juce::AudioProcessorEditor
{
public:
    SimpleReverbAudioProcessorEditor (SimpleReverbAudioProcessor&);
    ~SimpleReverbAudioProcessorEditor() override;

    //==============================================================================
    void paint (juce::Graphics&) override;
    void resized() override;

private:
    SimpleReverbAudioProcessor& audioProcessor;

    NameLabel sizeLabel,
              dampLabel,
              widthLabel,
              dwLabel;

    RotarySlider sizeSlider,
                 dampSlider,
                 widthSlider,
                 dwSlider;

    juce::TextButton freezeButton;

    juce::AudioProcessorValueTreeState::SliderAttachment sizeSliderAttachment,
                                                         dampSliderAttachment,
                                                         widthSliderAttachment,
                                                         dwSliderAttachment;

    juce::AudioProcessorValueTreeState::ButtonAttachment freezeAttachment;

    CustomLookAndFeel customLookAndFeel;

    juce::Colour blue      = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f, 1.0f);
    juce::Colour offWhite  = juce::Colour::fromFloatRGBA (0.83f, 0.84f, 0.9f, 1.0f);
    juce::Colour grey      = juce::Colour::fromFloatRGBA (0.42f, 0.42f, 0.42f, 1.0f);
    juce::Colour black     = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (SimpleReverbAudioProcessorEditor)
};
```

#### Constructor / Destructor

The implementation part of this constructor is as shown below:

```c++
SimpleReverbAudioProcessorEditor::SimpleReverbAudioProcessorEditor (SimpleReverbAudioProcessor& p)
    : AudioProcessorEditor (&p), audioProcessor (p),
      sizeSliderAttachment (audioProcessor.apvts, "size", sizeSlider),
      dampSliderAttachment (audioProcessor.apvts, "damp", dampSlider),
      widthSliderAttachment (audioProcessor.apvts, "width", widthSlider),
      dwSliderAttachment (audioProcessor.apvts, "dw", dwSlider),
      freezeAttachment (audioProcessor.apvts, "freeze", freezeButton)
{
    juce::LookAndFeel::getDefaultLookAndFeel().setDefaultSansSerifTypefaceName ("Avenir Next Medium");
    setSize (500, 250);
    setWantsKeyboardFocus (true);

    sizeLabel.setText ("size", juce::NotificationType::dontSendNotification);
    sizeLabel.attachToComponent (&sizeSlider, false);

    dampLabel.setText ("damp", juce::NotificationType::dontSendNotification);
    dampLabel.attachToComponent (&dampSlider, false);

    widthLabel.setText ("width", juce::NotificationType::dontSendNotification);
    widthLabel.attachToComponent (&widthSlider, false);

    dwLabel.setText ("dw", juce::NotificationType::dontSendNotification);
    dwLabel.attachToComponent (&dwSlider, false);

    freezeButton.setButtonText (juce::String (juce::CharPointer_UTF8 ("∞")));
    freezeButton.setClickingTogglesState (true);
    freezeButton.setLookAndFeel (&customLookAndFeel);
    freezeButton.setColour (juce::TextButton::buttonColourId, juce::Colours::transparentWhite);
    freezeButton.setColour (juce::TextButton::buttonOnColourId, juce::Colours::transparentWhite);
    freezeButton.setColour (juce::TextButton::textColourOnId, blue);
    freezeButton.setColour (juce::TextButton::textColourOffId, grey);

    addAndMakeVisible (sizeSlider);
    addAndMakeVisible (dampSlider);
    addAndMakeVisible (widthSlider);
    addAndMakeVisible (dwSlider);
    addAndMakeVisible (freezeButton);
}

SimpleReverbAudioProcessorEditor::~SimpleReverbAudioProcessorEditor()
{
    freezeButton.setLookAndFeel (nullptr);
}
```

#### paint()

Fill the background with a smoky black color and depict the text “Simple Reverb”:

```c++
void SimpleReverbAudioProcessorEditor::paint (juce::Graphics& g)
{
    g.fillAll (black);

    g.setFont (30);
    g.setColour (offWhite);
    g.drawText ("Simple Reverb", 150, 0, 200, 75, juce::Justification::centred);
}
```

#### resized()

The placement and size of each component is shown below:

```c++
void SimpleReverbAudioProcessorEditor::resized()
{
    sizeSlider.setBounds (30, 120, 60, 60);
    dampSlider.setBounds (125, 120, 60, 60);
    widthSlider.setBounds (315, 120, 60, 60);
    dwSlider.setBounds (410, 120, 60, 60);
    freezeButton.setBounds (210, 120, 80, 40);
}
```

Now let’s build and see!

![simple-reverb-build.png](/images/simple-reverb/simple-reverb-build.png)

### Font Embedding

If your PC does not have installed Avenir Next Medium Font, the font will not load properly.
Therefore, you need to embed the font in the plugin.
I won't go into detail in this article, but you can embed fonts by referring to the following forum and using BinaryBuilder provided by JUCE.

- [[Guide] Juce Font Embedding (2019) - JUCE Forum](https://forum.juce.com/t/guide-juce-font-embedding-2019/35041)
- [Modern custom font guide? - JUCE Forum](https://forum.juce.com/t/modern-custom-font-guide/20841/4)

I followed these instructions to embed Avenir Next Medium Font in Simple Reverb. Please take a look at my repository too.

- [szkkng/SimpleReverb - GitHub](https://github.com/szkkng/SimpleReverb)

## Conclusion

In this article, I explained how to make a simple reverb with the JUCE DSP module. I highly recommend this module as it allows you to quickly create a plugin.

If there’s a more efficient way to implement this, please do comment. Thanks for reading to the end!
