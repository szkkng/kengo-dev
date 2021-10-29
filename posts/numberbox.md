---
title: 'NumberBox'
date: '2021-10-29'
thumbnail: '/images/numberbox/numberbox.png'
---

## Introduction

### Prerequisites

![new-project.png](/images/numberbox/new-project.png)
![new-h-cpp.png](/images/numberbox/new-h-cpp.png)
![numberbox-h-cpp.png](/images/numberbox/numberbox-h-cpp.png)

## Basic NumberBox

NumberBox.h

```c++
#pragma once

#include <JuceHeader.h>

class NumberBox  : public juce::Slider
{
public:
    NumberBox();
		~NumberBox();

    void paint (juce::Graphics& g) override;
    void mouseDown (const juce::MouseEvent& event) override;
    void mouseUp (const juce::MouseEvent& event) override;
};
```

NumberBox.cpp

### Customizing Slider

```c++
#include "NumberBox.h"

NumberBox::NumberBox()
{
    setColour (juce::Slider::trackColourId, juce::Colours::transparentWhite);
    setSliderStyle (juce::Slider::LinearBarVertical);
    setTextBoxIsEditable (false);
    setVelocityBasedMode (true);
    setVelocityModeParameters (0.5, 1, 0.09, false);
    setRange (0, 100, 0.01);
    setValue (50.0);
    setDoubleClickReturnValue (true, 50.0);
    setTextValueSuffix (" %");
    setWantsKeyboardFocus (true);
    onValueChange = [&]()
    {
        if (getValue() < 10)
            setNumDecimalPlacesToDisplay(2);
        else if (10 <= getValue() && getValue() < 100)
            setNumDecimalPlacesToDisplay(1);
        else
            setNumDecimalPlacesToDisplay(0);
    };
}

NumberBox::~NumberBox(){}

void NumberBox::paint (juce::Graphics& g)
{
    if (hasKeyboardFocus (false))
    {
        auto bounds = getLocalBounds().toFloat();
        auto h = bounds.getHeight();
        auto w = bounds.getWidth();
        auto len = juce::jmin (h, w) * 0.15f;
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

void NumberBox::mouseDown (const juce::MouseEvent& event)
{
    juce::Slider::mouseDown (event);

    setMouseCursor (juce::MouseCursor::NoCursor);
}

void NumberBox::mouseUp (const juce::MouseEvent& event)
{
    juce::Slider::mouseUp (event);

    juce::Desktop::getInstance().getMainMouseSource().setScreenPosition (event.source.getLastMouseDownPosition());

    setMouseCursor (juce::MouseCursor::NormalCursor);
}
```

#### Constructor

#### paint

#### mouseDown / mouseUp

### MainComponent.h/.cpp

MainComponent.h

```c++
#include "NumberBox.h"
```

```c++
class MainComponent  : public juce::Component
{
public:
・・・
private:
    NumberBox blueBox, greenBox, yellowBox;

    juce::Colour blue   = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);
    juce::Colour green  = juce::Colour::fromFloatRGBA (0.34f, 0.74f, 0.66f, 1.0f);
    juce::Colour yellow = juce::Colour::fromFloatRGBA (1.0f,  0.71f, 0.2f,  1.0f);
    juce::Colour black  = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MainComponent)
};
```

MainComponent.cpp

```c++
MainComponent::MainComponent()
{
    setSize (500, 300);
    setWantsKeyboardFocus (true);

    blueBox.setColour (juce::Slider::textBoxTextColourId, blue);
    blueBox.setColour (juce::Slider::textBoxOutlineColourId, blue);

    greenBox.setColour (juce::Slider::textBoxTextColourId, green);
    greenBox.setColour (juce::Slider::textBoxOutlineColourId, green);

    yellowBox.setColour (juce::Slider::textBoxTextColourId, yellow);
    yellowBox.setColour (juce::Slider::textBoxOutlineColourId, yellow);

    addAndMakeVisible (blueBox);
    addAndMakeVisible (greenBox);
    addAndMakeVisible (yellowBox);
}

MainComponent::~MainComponent()
{
}

void MainComponent::paint (juce::Graphics& g)
{
    g.fillAll (black);
}

void MainComponent::resized()
{
    auto bounds = getLocalBounds().withSizeKeepingCentre (80, 30);

    blueBox.setBounds (bounds.withX (50));
    greenBox.setBounds (bounds.withX (205));
    yellowBox.setBounds (bounds.withX (360));
}
```

### Building

![basic-numberbox.png](/images/numberbox/basic-numberbox.png)

## CustomLookAndFeel

### Customizing LookAndFeel

NumberBox.h

```c++
class CustomLookAndFeel : public juce::LookAndFeel_V4
{
public:
    juce::CaretComponent* createCaretComponent (juce::Component* keyFocusOwner) override;
    juce::Label* createSliderTextBox (juce::Slider& slider) override;
};
```

```c++
class NumberBox  : public juce::Slider, public juce::KeyListener
{
public:
・・・
private:
    CustomLookAndFeel customLookAndFeel;
・・・
};
```

NumberBox.cpp

```c++
juce::CaretComponent* CustomLookAndFeel::createCaretComponent (juce::Component* keyFocusOwner)
{
    auto caret = new juce::CaretComponent (keyFocusOwner);

    caret->setColour (juce::CaretComponent::caretColourId, keyFocusOwner->findColour (juce::Label::textColourId));

    return caret;
}

juce::Label* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
    auto* l = new juce::Label();

    l->setJustificationType (juce::Justification::centred);
    l->setColour (juce::Label::textColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::textWhenEditingColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::outlineWhenEditingColourId, juce::Colours::transparentWhite);
    l->setFont (18);

    return l;
}
```

```c++
NumberBox::NumberBox()
{
    setLookAndFeel (&customLookAndFeel);
・・・
}

NumberBox::~NumberBox()
{
    setLookAndFeel(nullptr);
}
```

### Building

![customLAF.png](/images/numberbox/customLAF.png)

## Edit Mode

### Customizing Label

NumberBox.h

```c++
class CustomLabel : public juce::Label
{
public:
    static juce::String initialPressedKey;

    juce::TextEditor* createEditorComponent() override;
    void editorShown (juce::TextEditor* editor) override;
};
```

```c++
class CustomLookAndFeel : public juce::LookAndFeel_V4
{
public:
・・・
    CustomLabel* createSliderTextBox (juce::Slider& slider) override;
};
```

NumberBox.cpp

```c++
juce::String CustomLabel::initialPressedKey = "";

juce::TextEditor* CustomLabel::createEditorComponent()
{
    auto* ed = juce::Label::createEditorComponent();

    ed->setJustification (juce::Justification::centred);
    ed->setColour (juce::TextEditor::backgroundColourId, juce::Colours::transparentWhite);
    ed->setInputRestrictions (5, "0123456789.");
    ed->setIndents (4, -1);

    return ed;
}

void CustomLabel::editorShown (juce::TextEditor* editor)
{
    editor->clear();
    editor->setText (initialPressedKey);
}
```

```c++
CustomLabel* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
    auto* l = new CustomLabel();
・・・
}
```

### Adding KeyListener

NumberBox.h

```c++
class NumberBox  : public juce::Slider, public juce::KeyListener
{
public:
・・・
    bool keyPressed (const juce::KeyPress& k, juce::Component* c) override;

```

NumberBox.cpp

```c++
NumberBox::NumberBox()
{
・・・
    addKeyListener (this);
}

```

```c++
bool NumberBox::keyPressed (const juce::KeyPress& k, juce::Component* c)
{
    char numChars[] = "0123456789";

    for (auto numChar : numChars)
    {
        if (k.getTextCharacter() == numChar)
        {
            setTextBoxIsEditable (true);
            CustomLabel::initialPressedKey = juce::String::charToString (k.getTextCharacter());
            showTextBox();
            setTextBoxIsEditable (false);

            return true;
        }
    }

    return false;
}
```

### Building

![final-numberbox.png](/images/numberbox/final-numberbox.png)

## Conclusion
