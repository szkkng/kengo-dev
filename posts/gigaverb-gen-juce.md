---
title: 'Gigaverb - JUCE × gen~'
createdDate: '2021-09-20'
updatedDate: '2021-09-20'
thumbnail: '/images/gigaverb-gen-juce/gigaverb-juce-finish.png'
---

## Introduction

In this tutorial, I will briefly explain the steps to make Gigaverb with Gen Code Export and JUCE.

![finish.png](/images/gigaverb-gen-juce/gigaverb-juce-finish.png)

## JUCE

Create a new project named Gigaverb.

![juce-new-project.png](/images/gigaverb-gen-juce/juce-new-project.png)

## Max

### Gigaverb

Launch max, search for Gigaverb and open it.

![gigaverb-patch-open.png](/images/gigaverb-gen-juce/gigaverb-patch-open.png)

### Gen Code Export

Send gen~ the exportcode message in order to export the genpatcher as C++ code.

![gigaverb-exportcode.png](/images/gigaverb-gen-juce/gigaverb-exportcode.png)

After clicking exportcode, create a directory named gen_export under Source directory of the JUCE project you just created, and select the gen_export directory as the export destination.

![gigaverb-exportcode-dialog.png](/images/gigaverb-gen-juce/gigaverb-exportcode-dialog.png)

![gigaverb-gen-export-folder.png](/images/gigaverb-gen-juce/gigaverb-gen-export-folder.png)

Under this directory, the following directory and files should have been created.

![gigaverb-exported-code.png](/images/gigaverb-gen-juce/gigaverb-exported-code.png)

## JUCE

### Projucer settings

Add the directory you just exported.

![juce-add-files.png](/images/gigaverb-gen-juce/juce-add-files.png)

![juce-add-exported-files.png](/images/gigaverb-gen-juce/juce-add-exported-files.png)

If it was added correctly, it should look like this:

![juce-added-files.png](/images/gigaverb-gen-juce/juce-added-files.png)

Set Header Search Paths for Debug and Release.

![juce-header-search-path.png](/images/gigaverb-gen-juce/juce-header-search-path.png)

In my case, PROJECT_DIR is the following Path:

```bash:CommandLine
~/Documents/MyProject/Gigaverb/Builds/MacOSX
❯❯❯ xcodebuild -showBuildSettings | grep "PROJECT_DIR"
    PROJECT_DIR = /Users/suzukikengo/Documents/MyProject/Gigaverb/Builds/MacOSX
```

If the Header Search Paths are set correctly, the build will succeed.

![hello-world.png](/images/gigaverb-gen-juce/hello-world.png)

### PluginProcessor.h/.cpp

Implement the following using APVTS.

```c++:PluginProcessor.h
#pragma once

#include <JuceHeader.h>
#include "gen_exported.h"

class GigaverbAudioProcessor  : public juce::AudioProcessor,
                                public juce::AudioProcessorValueTreeState::Listener
{
public:
・・・
    using APVTS = juce::AudioProcessorValueTreeState;
    APVTS::ParameterLayout createParameterLayout();
    APVTS apvts { *this, nullptr, "Parameters", createParameterLayout() };

    void parameterChanged (const juce::String& parameterID, float newValue) override;

protected:
    void assureBufferSize (long bufferSize);

private:
    //==============================================================================
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (GigaverbAudioProcessor)

    CommonState* m_C74PluginState;
    long m_CurrentBufferSize;
    t_sample** m_InputBuffers;
    t_sample** m_OutputBuffers;
};
```

```c++:PluginProcessor.cpp
GigaverbAudioProcessor::GigaverbAudioProcessor() : m_CurrentBufferSize (0)
{
    m_C74PluginState = (CommonState*) gen_exported::create (44100, 64);
    gen_exported::reset (m_C74PluginState);

    m_InputBuffers  = new t_sample *[gen_exported::num_inputs()];
    m_OutputBuffers = new t_sample *[gen_exported::num_outputs()];

    for (int i = 0; i < gen_exported::num_inputs(); i++)
        m_InputBuffers[i] = nullptr;

    for (int i = 0; i < gen_exported::num_outputs(); i++)
        m_OutputBuffers[i] = nullptr;

    for (int i = 0; i < gen_exported::num_params(); ++i)
    {
        auto name = juce::String (gen_exported::getparametername (m_C74PluginState, i));
        apvts.addParameterListener (name, this);
    }
}
```

```c++:PluginProcessor.cpp
void GigaverbAudioProcessor::prepareToPlay (double sampleRate, int samplesPerBlock)
{
    m_C74PluginState->sr = sampleRate;
    m_C74PluginState->vs = samplesPerBlock;

    assureBufferSize (samplesPerBlock);
}
```

```c++:PluginProcessor.cpp
void GigaverbAudioProcessor::processBlock (juce::AudioBuffer<float>& buffer, juce::MidiBuffer& midiMessages)
{
    for (int i = 0; i < gen_exported::num_inputs(); i++)
    {
        if (i < getTotalNumInputChannels())
        {
            for (int j = 0; j < m_CurrentBufferSize; j++)
                m_InputBuffers[i][j] = buffer.getReadPointer (i)[j];
        }
        else
        {
            memset (m_InputBuffers[i], 0, m_CurrentBufferSize *  sizeof (double));
        }
    }

    gen_exported::perform(m_C74PluginState,
                          m_InputBuffers,
                          gen_exported::num_inputs(),
                          m_OutputBuffers,
                          gen_exported::num_outputs(),
                          buffer.getNumSamples());

    for (int i = 0; i < getTotalNumOutputChannels(); i++)
    {
        if (i < gen_exported::num_outputs())
        {
            for (int j = 0; j < buffer.getNumSamples(); j++)
                buffer.getWritePointer (i)[j] = m_OutputBuffers[i][j];
        }
        else
        {
            buffer.clear (i, 0, buffer.getNumSamples());
        }
    }
}
```

```c++:PluginProcessor.cpp
void GigaverbAudioProcessor::assureBufferSize (long bufferSize)
{
    if (bufferSize > m_CurrentBufferSize)
    {
        for (int i = 0; i < gen_exported::num_inputs(); i++)
        {
            if (m_InputBuffers[i])
                delete m_InputBuffers[i];

            m_InputBuffers[i] = new t_sample[bufferSize];
        }

        for (int i = 0; i < gen_exported::num_outputs(); i++)
        {
            if (m_OutputBuffers[i])
                delete m_OutputBuffers[i];

            m_OutputBuffers[i] = new t_sample[bufferSize];
        }

        m_CurrentBufferSize = bufferSize;
    }
}
```

```c++:PluginProcessor.cpp
void GigaverbAudioProcessor::parameterChanged (const juce::String& parameterID, float newValue)
{
    auto index = apvts.getParameter(parameterID)->getParameterIndex();
    gen_exported::setparameter (m_C74PluginState, index, newValue, nullptr);
}
```

```c++:PluginProcessor.cpp
juce::AudioProcessorValueTreeState::ParameterLayout GigaverbAudioProcessor::createParameterLayout()
{
    m_C74PluginState = (CommonState*) gen_exported::create (44100, 64);
    gen_exported::reset (m_C74PluginState);

    juce::AudioProcessorValueTreeState::ParameterLayout layout;

    for (int i = 0; i < gen_exported::num_params(); ++i)
    {
        auto name   = juce::String (gen_exported::getparametername (m_C74PluginState, i));
        auto min = gen_exported::getparametermin (m_C74PluginState, i);
        auto max = gen_exported::getparametermax (m_C74PluginState, i);
        auto defaultValue = m_C74PluginState->params[i].defaultvalue;

        layout.add (std::make_unique<juce::AudioParameterFloat> (name, name,
                                                                 juce::NormalisableRange<float> (min, max, 0.01f, 1.f),
                                                                 defaultValue,
                                                                 juce::String(),
                                                                 juce::AudioProcessorParameter::genericParameter,
                                                                 nullptr,
                                                                 nullptr));
    }

    return layout;
}
```

### Preparing custom components

Use my custom components for the UI part.

- [Modern Dial](https://github.com/szkkng/ModernDial)

Follow the steps below to create ModernDial.h/.cpp, CustomLookAndFeel.h/.cpp, and NameLabel.h.

![juce-new-cpp-files.png](/images/gigaverb-gen-juce/juce-new-cpp-files.png)

![juce-select-files.png](/images/gigaverb-gen-juce/juce-select-files.png)

Finally, Source directory looks like the following:

![juce-final-source.png](/images/gigaverb-gen-juce/juce-final-source.png)

#### ModernDial.h/.cpp

```c++:ModernDial.h
#pragma once

#include <JuceHeader.h>
#include "CustomLookAndFeel.h"

class ModernDial  : public juce::Slider
{
public:
    ModernDial();
    ~ModernDial();

    void paint (juce::Graphics& g) override;

    void mouseDown (const juce::MouseEvent& event) override;
    void mouseUp (const juce::MouseEvent& event) override;

private:
    CustomLookAndFeel customLookAndFeel;

    juce::Colour grey      = juce::Colour::fromFloatRGBA (0.42f, 0.42f, 0.42f, 1.0f);
    juce::Colour blackGrey = juce::Colour::fromFloatRGBA (0.2f,  0.2f,  0.2f, 1.0f);
    juce::Colour blue   = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (ModernDial)
};
```

```c++:ModernDial.cpp
#include "ModernDial.h"

ModernDial::ModernDial()
{
    setSliderStyle (juce::Slider::SliderStyle::RotaryVerticalDrag);
    setRotaryParameters (juce::MathConstants<float>::pi * 1.25f,
                         juce::MathConstants<float>::pi * 2.75f,
                         true);
    setColour (juce::Slider::textBoxTextColourId, blackGrey);
    setColour (juce::Slider::rotarySliderFillColourId, blue);
    setColour (juce::Slider::textBoxOutlineColourId, grey);
    setLookAndFeel (&customLookAndFeel);
    setVelocityBasedMode (true);
    setVelocityModeParameters (1.0, 1, 0.09, false);
    setWantsKeyboardFocus (true);
}

ModernDial::~ModernDial()
{
}

void ModernDial::paint (juce::Graphics& g)
{
    juce::Slider::paint (g);

    if (hasKeyboardFocus (false))
    {
        auto bounds = getLocalBounds().toFloat();
        auto h = bounds.getHeight();
        auto w = bounds.getWidth();
        auto len = juce::jmin (h, w) * 0.07f;
        auto thick  = len / 1.8f;

        g.setColour (findColour (juce::Slider::textBoxOutlineColourId));

        // Left top
        g.drawLine (0.0f, 0.0f, 0.0f, len, thick);
        g.drawLine (0.0f, 0.0f, len, 0.0f, thick);

        // Left bottom
        g.drawLine (0.0f, h, 0.0f, h - len, thick);
        g.drawLine (0.0f, h, len, h, thick);

        // Right top
        g.drawLine (w, 0.0f, w, len, thick);
        g.drawLine (w, 0.0f, w - len, 0.0f, thick);

        // Right bottom
        g.drawLine (w, h, w, h - len, thick);
        g.drawLine (w, h, w - len, h, thick);
    }
}

void ModernDial::mouseDown (const juce::MouseEvent& event)
{
    juce::Slider::mouseDown (event);

    setMouseCursor (juce::MouseCursor::NoCursor);
}

void ModernDial::mouseUp (const juce::MouseEvent& event)
{
    juce::Slider::mouseUp (event);

    juce::Desktop::getInstance().getMainMouseSource().setScreenPosition (event.source.getLastMouseDownPosition());

    setMouseCursor (juce::MouseCursor::NormalCursor);
}
```

#### CustomLookAndFeel.h/.cpp

```c++:CustomLookAndFeel.h
#pragma once

#include <JuceHeader.h>

class CustomLookAndFeel : public juce::LookAndFeel_V4
{
public:
    CustomLookAndFeel();
    ~CustomLookAndFeel();

    juce::Slider::SliderLayout getSliderLayout (juce::Slider& slider) override;

    void drawRotarySlider (juce::Graphics&, int x, int y, int width, int height,
                           float sliderPosProportional, float rotaryStartAngle,
                           float rotaryEndAngle, juce::Slider&) override;

    juce::Label* createSliderTextBox (juce::Slider& slider) override;

private:
    juce::Colour blue      = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);
    juce::Colour offWhite  = juce::Colour::fromFloatRGBA (0.83f, 0.84f, 0.9f,  1.0f);
    juce::Colour grey      = juce::Colour::fromFloatRGBA (0.42f, 0.42f, 0.42f, 1.0f);
    juce::Colour blackGrey = juce::Colour::fromFloatRGBA (0.2f,  0.2f,  0.2f,  1.0f);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (CustomLookAndFeel);
};
```

```c++:CustomLookAndFeel.cpp
#include "CustomLookAndFeel.h"

CustomLookAndFeel::CustomLookAndFeel() {};
CustomLookAndFeel::~CustomLookAndFeel() {};

juce::Slider::SliderLayout CustomLookAndFeel::getSliderLayout (juce::Slider& slider)
{
    auto localBounds = slider.getLocalBounds();

    juce::Slider::SliderLayout layout;

    layout.textBoxBounds = localBounds;
    layout.sliderBounds = localBounds;

    return layout;
}

void CustomLookAndFeel::drawRotarySlider (juce::Graphics& g, int x, int y, int width, int height, float sliderPos,
                                          const float rotaryStartAngle, const float rotaryEndAngle, juce::Slider& slider)
{
    auto fill = slider.findColour (juce::Slider::rotarySliderFillColourId);

    auto bounds = juce::Rectangle<float> (x, y, width, height).reduced (2.0f);
    auto radius = juce::jmin (bounds.getWidth(), bounds.getHeight()) / 2.0f;
    auto toAngle = rotaryStartAngle + sliderPos * (rotaryEndAngle - rotaryStartAngle);
    auto lineW = radius * 0.085f;
    auto arcRadius = radius - lineW * 1.6f;

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

    g.setColour (fill);
    g.strokePath (valueArc, juce::PathStrokeType (lineW, juce::PathStrokeType::curved, juce::PathStrokeType::rounded));

    juce::Path thumb;
    auto thumbWidth = lineW * 2.0f;

    thumb.addRectangle (-thumbWidth / 2, -thumbWidth / 2, thumbWidth, radius + lineW);

    g.setColour (offWhite);
    g.fillPath (thumb, juce::AffineTransform::rotation (toAngle + 3.12f).translated (bounds.getCentre()));

    g.fillEllipse (bounds.reduced (radius * 0.28));
}

juce::Label* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
    auto* l = new juce::Label();

    l->setFont (15.0f);
    l->setJustificationType (juce::Justification::centred);
    l->setColour (juce::Label::textColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::textWhenEditingColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::outlineWhenEditingColourId, slider.findColour (juce::Slider::textBoxOutlineColourId));
    l->setInterceptsMouseClicks (false, false);

    return l;
}
```

#### NameLabel.h

```c++:NameLabel.h
#pragma once

#include <JuceHeader.h>

class NameLabel  : public juce::Label
{
public:
    NameLabel()
    {
        setFont (15.0f);
        setColour (juce::Label::textColourId, grey);
        setJustificationType (juce::Justification::centred);
    }

private:
    juce::Colour grey = juce::Colour::fromFloatRGBA (0.55f, 0.55f, 0.55f, 1.0f);
};
```

### PluginEditor.h/.cpp

Prepare the necessary member variables and functions.

```c++:PluginEditor.h
#pragma once

#include <JuceHeader.h>
#include "PluginProcessor.h"
#include "NameLabel.h"
#include "CustomLookAndFeel.h"
#include "ModernDial.h"

class GigaverbAudioProcessorEditor  : public juce::AudioProcessorEditor
{
・・・
private:
    std::vector<ModernDial*> getDials();

    GigaverbAudioProcessor& audioProcessor;

    ModernDial roomsizeDial,
               revtimeDial,
               spreadDial,
               bandwidthDial,
               dampingDial,
               dryDial,
               earlyDial,
               tailDial;

    NameLabel roomsizeLabel,
              revtimeLabel,
              spreadLabel,
              bandwidthLabel,
              dampingLabel,
              dryLabel,
              earlyLabel,
              tailLabel;

    using Attachment = juce::AudioProcessorValueTreeState::SliderAttachment;

    Attachment roomsizeAttachment,
               revtimeAttachment,
               spreadAttachment,
               bandwidthAttachment,
               dampingAttachment,
               dryAttachment,
               earlyAttachment,
               tailAttachment;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (GigaverbAudioProcessorEditor)
};
```

```c++:PluginEditor.cpp
GigaverbAudioProcessorEditor::GigaverbAudioProcessorEditor (GigaverbAudioProcessor& p)
    : AudioProcessorEditor (&p), audioProcessor (p),
      roomsizeAttachment  (audioProcessor.apvts, "roomsize",  roomsizeDial),
      revtimeAttachment   (audioProcessor.apvts, "revtime",   revtimeDial),
      spreadAttachment    (audioProcessor.apvts, "spread",    spreadDial),
      bandwidthAttachment (audioProcessor.apvts, "bandwidth", bandwidthDial),
      dampingAttachment   (audioProcessor.apvts, "damping",   dampingDial),
      dryAttachment       (audioProcessor.apvts, "dry",       dryDial),
      earlyAttachment     (audioProcessor.apvts, "early",     earlyDial),
      tailAttachment      (audioProcessor.apvts, "tail",      tailDial)
{
    setSize (500, 300);
    setWantsKeyboardFocus (true);

    roomsizeLabel.setText  ("roomsize",  juce::NotificationType::dontSendNotification);
    revtimeLabel.setText   ("revtime",   juce::NotificationType::dontSendNotification);
    spreadLabel.setText    ("spread",    juce::NotificationType::dontSendNotification);
    bandwidthLabel.setText ("bandwidth", juce::NotificationType::dontSendNotification);
    dampingLabel.setText   ("damping",   juce::NotificationType::dontSendNotification);
    dryLabel.setText       ("dry",       juce::NotificationType::dontSendNotification);
    earlyLabel.setText     ("early",     juce::NotificationType::dontSendNotification);
    tailLabel.setText      ("tail",      juce::NotificationType::dontSendNotification);

    roomsizeLabel.attachToComponent  (&roomsizeDial,  false);
    revtimeLabel.attachToComponent   (&revtimeDial,   false);
    spreadLabel.attachToComponent    (&spreadDial,    false);
    bandwidthLabel.attachToComponent (&bandwidthDial, false);
    dampingLabel.attachToComponent   (&dampingDial,   false);
    dryLabel.attachToComponent       (&dryDial,       false);
    earlyLabel.attachToComponent     (&earlyDial,     false);
    tailLabel.attachToComponent      (&tailDial,      false);

    for (auto* dial : getDials())
    {
        addAndMakeVisible (dial);
    }
}
```

```c++:PluginEditor.cpp
void GigaverbAudioProcessorEditor::paint (juce::Graphics& g)
{
    g.fillAll (juce::Colours::black);
}
```

```c++:PluginEditor.cpp
void GigaverbAudioProcessorEditor::resized()
{
    roomsizeDial.setBounds  (50,  70,  70, 70);
    revtimeDial.setBounds   (160, 70,  70, 70);
    spreadDial.setBounds    (270, 70,  70, 70);
    bandwidthDial.setBounds (380, 70,  70, 70);
    dampingDial.setBounds   (50,  200, 70, 70);
    dryDial.setBounds       (160, 200, 70, 70);
    earlyDial.setBounds     (270, 200, 70, 70);
    tailDial.setBounds      (380, 200, 70, 70);
}
```

```c++:PluginEditor.cpp
std::vector<ModernDial*> GigaverbAudioProcessorEditor::getDials()
{
    return
    {
         &roomsizeDial,
         &revtimeDial,
         &spreadDial,
         &bandwidthDial,
         &dampingDial,
         &dryDial,
         &earlyDial,
         &tailDial
    };
}
```

### Building

![finish.png](/images/gigaverb-gen-juce/gigaverb-juce-finish.png)

## References

- [Gen Code Export: VST](https://cycling74.com/tutorials/gen-code-export-vst)
- [JUCE: Class Index](https://docs.juce.com/master/index.html)
