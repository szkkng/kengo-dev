---
title: 'Dial Customization'
date: '2021-11-22'
thumbnail: '/images/dial-customization/three-color-dial.png'
---

## Introduction

![final-dial.png](/images/dial-customization/final-dial.png)

In this tutorial, I will explain how to create [Modern Dial](https://github.com/szkkng/ModernDial).
This dial was designed by [suzuki kentaro](https://twitter.com/szk_1992), and I made this with JUCE.
Before we start the tutorial, we need to do a little preparation.

### Prerequisites

Select "GUI" template and create a new project named DialTutorial.
![new-project.png](/images/dial-customization/new-project.png)

Then, select "Add New CPP & Header File" or "Add New Header File" as shown below to create all the files needed for this tutorial in advance.

Files to create:

- CustomColours.h
- CustomLookAndFeel.h/.cpp
- Dial.h/.cpp
  ![add-new-cpp-header.png](/images/dial-customization/add-new-cpp-header.png)

Make sure all the files have been created and open your IDE.
![added-files.png](/images/dial-customization/added-files.png)

Next, define the following custom colours in CustomColours.h:

```c++
#pragma once
#include <JuceHeader.h>

namespace CustomColours
{
    const juce::Colour blue       = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);
    const juce::Colour green      = juce::Colour::fromFloatRGBA (0.34f, 0.74f, 0.66f, 1.0f);
    const juce::Colour yellow     = juce::Colour::fromFloatRGBA (1.0f,  0.71f, 0.2f,  1.0f);
    const juce::Colour creamWhite = juce::Colour::fromFloatRGBA (0.96f, 0.98f, 0.89f, 1.0f);
    const juce::Colour grey       = juce::Colour::fromFloatRGBA (0.55f, 0.55f, 0.55f, 1.0f);
    const juce::Colour blackGrey  = juce::Colour::fromFloatRGBA (0.2f,  0.2f,  0.2f,  1.0f);
    const juce::Colour black      = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
}
```

Finally, make sure it builds successfully.
![hello-world.png](/images/dial-customization/hello-world.png)

That's all the preparation we need to do to start the tutorial. Let's get started!

## Basic Dial

In this chapter, we will create a basic dial as shown below.
![basic-dial.png](/images/dial-customization/basic-dial.png)

### Customizing slider

First, I will show you the whole implementation of Dial class, and then I will pick up some particularly important member functions and explain them.

Dial.h:

```c++
#pragma once

#include <JuceHeader.h>
#include "CustomColours.h"

class Dial  : public juce::Slider
{
public:
    Dial();
    ~Dial();
};
```

Dial.cpp:

```c++
Dial::Dial()
{
    setSliderStyle (juce::Slider::SliderStyle::RotaryVerticalDrag);
    setTextBoxStyle (juce::Slider::TextBoxBelow, false, 80, 20);
    setRotaryParameters (juce::MathConstants<float>::pi * 1.25f,
                         juce::MathConstants<float>::pi * 2.75f,
                         true);
    setColour (juce::Slider::textBoxTextColourId,    CustomColours::creamWhite);
    setColour (juce::Slider::textBoxOutlineColourId, CustomColours::grey);
    setColour (juce::Slider::rotarySliderFillColourId, CustomColours::blue);
    setVelocityBasedMode (true);
    setVelocityModeParameters (1.0, 1, 0.1, false);
    setRange (0.0, 100.0, 0.01);
    setValue (50.0);
    setDoubleClickReturnValue (true, 50.0);
    setTextValueSuffix (" %");
    onValueChange = [&]()
    {
        if (getValue() < 10)
            setNumDecimalPlacesToDisplay (2);
        else if (10 <= getValue() && getValue() < 100)
            setNumDecimalPlacesToDisplay (1);
        else
            setNumDecimalPlacesToDisplay (0);
    };
}

Dial::~Dial()
{
}
```

#### setRotaryParamters()

[setRotaryParamters()](https://docs.juce.com/master/classSlider.html#a19ec1c1f7564884be94ecde8dc56f0ab) sets the start and goal points of the dial in radians. The default setting is too wide a range of movement for the dial knob, so it is slightly narrowed.

Before(left) & After(right):
![setRotaryParamters.png](/images/dial-customization/setRotaryParameters.png)

#### VelocityBasedMode

To enable VelocityBasedMode, pass true to [setVelocityBasedMode()](https://docs.juce.com/master/classSlider.html#a59b616e79738d3adb83093dc532822d0). Enabling this mode brings various benefits, such as adjusting the amount of value increase based on the speed of mouse dragging and mouse hiding while dragging. Also, by calling [setVelocityModeParameters()](https://docs.juce.com/master/classSlider.html#a47c37989ff5f6453f2c44f1a7455e1c1), you can set detailed settings such as sensitivity, threshold, offset, etc.
The example below shows the respective mouse drags when this mode is turned on and off.

off(left) / on(right):
![velocity-mode.gif](/images/dial-customization/velocity-mode.gif)

#### setNumDecimalPlacesToDisplay()

[setNumDecimalPlacesToDisplay()](https://docs.juce.com/master/classSlider.html#adfdee31f5271d9084e544daaa4c59423) modifies the decimal places of the values displayed in the slider text box. Using this member function and a lambda function called [onValueChange](https://docs.juce.com/master/classSlider.html#a680d007f6a824a28a60aa05b4045e794), we set the value in the text box to always display three numbers.

At 100%, five numbers are redundant(Left):
![onValueChange.png](/images/dial-customization/onValueChange.png)

Even at 50%, four numbers is redundant(Left):
![onValueChange2.png](/images/dial-customization/onValueChange2.png)

### Creating Dial objects

Now, create an object of the customized Dial class and display it in the editor. Be careful not to forget to include Dail.h and CustomColours.h.

MainComponent.h:

```c++
#pragma once

#include <JuceHeader.h>
#include "Dial.h"
#include "CustomColours.h"

class MainComponent  : public juce::Component
{
・・・
private:
    Dial dial;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MainComponent)
};
```

MainComponent.cpp:

```c++
#include "MainComponent.h"

MainComponent::MainComponent()
{
    setSize (600, 400);

    addAndMakeVisible (dial);
}

MainComponent::~MainComponent()
{
}

void MainComponent::paint (juce::Graphics& g)
{
    g.fillAll (CustomColours::black);
}

void MainComponent::resized()
{
    dial.setBounds (getLocalBounds().withSizeKeepingCentre (100, 100));
}
```

### Building

![basic-dial.png](/images/dial-customization/basic-dial.png)

## LookAndFeel

In this chapter, we will customize LookAndFeel class to create the following dial:

![LookAndFeel.png](/images/dial-customization/LookAndFeel.png)

### Customizing LookAndFeel

I will first show the overall implementation, and then explain each member function.

```c++
#pragma once

#include <JuceHeader.h>
#include "CustomColours.h"

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
};
```

```c++
#include "CustomLookAndFeel.h"

CustomLookAndFeel::CustomLookAndFeel() {};
CustomLookAndFeel::~CustomLookAndFeel() {};

juce::Slider::SliderLayout CustomLookAndFeel::getSliderLayout (juce::Slider& slider)
{
    auto localBounds = slider.getLocalBounds();

    juce::Slider::SliderLayout layout;

    layout.textBoxBounds = localBounds.withY (-1);
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

    g.setColour (CustomColours::blackGrey);
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

    juce::Path stick;
    auto stickWidth = lineW * 2.0f;

    stick.addRectangle (-stickWidth / 2, -stickWidth / 2, stickWidth, radius + lineW);

    g.setColour (CustomColours::creamWhite);
    g.fillPath (stick, juce::AffineTransform::rotation (toAngle + 3.12f).translated (bounds.getCentre()));

    g.fillEllipse (bounds.reduced (radius * 0.25));
}

juce::Label* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
    auto* l = new juce::Label();

    l->setJustificationType (juce::Justification::centred);
    l->setColour (juce::Label::textColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::textWhenEditingColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::outlineWhenEditingColourId, juce::Colours::transparentWhite);
    l->setInterceptsMouseClicks (false, false);
    l->setFont (18.0f);

    return l;
}
```

#### getSliderLayout()

[getSliderLayout()](https://docs.juce.com/master/classLookAndFeel__V2.html#a5bdac020795c695459eefdd7b911814e) is a function that returns the slider layout, which is the position of the slider and text box. By overriding this function, you can change the layout as you wish. In this case, we implemented it so that the text box is centered on the slider.

```c++
juce::Slider::SliderLayout CustomLookAndFeel::getSliderLayout (juce::Slider& slider)
{
    auto localBounds = slider.getLocalBounds();

    juce::Slider::SliderLayout layout;

    layout.textBoxBounds = localBounds.withY (-1);
    layout.sliderBounds = localBounds;

    return layout;
}
```

Also, since the font is positioned a little lower, we have positioned the text box slightly higher by calling [withY (-1)](https://docs.juce.com/master/classRectangle.html#ab989f8938b2daa529b8e12494114be0a).

Before(left) & After(right):
![getSliderLayout.png](/images/dial-customization/getSliderLayout.png)

#### drawRotarySlider()

[drawRotraySlider()]() is the member function that has the most impact on the appearance of a rotary-style slider.
In order to make it easier to understand which part of the implementation describes what, I divided the implementation into smaller parts and added corresponding images to each part.

```c++
・・・
    juce::Path backgroundArc;
    backgroundArc.addCentredArc (bounds.getCentreX(),
                                 bounds.getCentreY(),
                                 arcRadius,
                                 arcRadius,
                                 0.0f,
                                 rotaryStartAngle,
                                 rotaryEndAngle,
                                 true);

    g.setColour (CustomColours::blackGrey);
    g.strokePath (backgroundArc, juce::PathStrokeType (lineW, juce::PathStrokeType::curved, juce::PathStrokeType::rounded));
・・・
```

![dial-background-arc.png](/images/dial-customization/dial-background-arc.png)

```c++
・・・
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
・・・
```

![dial-value-arc.png](/images/dial-customization/dial-value-arc.png)

```c++
・・・
    juce::Path stick;
    auto stickWidth = lineW * 2.0f;

    stick.addRectangle (-stickWidth / 2, -stickWidth / 2, stickWidth, radius + lineW);

    g.setColour (CustomColours::creamWhite);
    g.fillPath (stick, juce::AffineTransform::rotation (toAngle + 3.12f).translated (bounds.getCentre()));
・・・
```

![dial-thumb.png](/images/dial-customization/dial-thumb.png)

```c++
・・・
    g.fillEllipse (bounds.reduced (radius * 0.25));
```

![dial-ellipse.png](/images/dial-customization/dial-ellipse.png)

To understand these codes, it is essential to have an understanding of the [juce::Graphics](https://docs.juce.com/master/classGraphics.html) and [juce::Path](https://docs.juce.com/master/classPath.html) classes. I have previously posted an article with examples of the use of important member functions in these two classes, so please check this out if you are interested.

- [juce::Graphics::draw\* Examples](https://suzuki-kengo.dev/posts/juce-graphics-draw-examples)
- [juce::Path::add\* Examples](https://suzuki-kengo.dev/posts/juce-path-add-examples)

#### createSliderTextBox()

[createSliderTextBox()]() is a member function for setting up a slider text box (juce::Label).

```c++
juce::Label* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
    auto* l = new juce::Label();

    l->setJustificationType (juce::Justification::centred);
    l->setColour (juce::Label::textColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::textWhenEditingColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::outlineWhenEditingColourId, juce::Colours::transparentWhite);
    l->setInterceptsMouseClicks (false, false);
    l->setFont (18.0f);

    return l;
}
```

The most important function in this implementation part is [setInterceptsMouseClicks()](https://docs.juce.com/master/classComponent.html#ac9fdcb595c1878201a641de2e1159aec). This is a function that sets whether or not the target component will accept mouse clicks. In our case, we have a text box (painted in green to illustrate) covering the slider as shown below, so we need to pass false to this function to prevent the text box from accepting mouse clicks. Without doing this you will not be able to drag this dial.

![front-label.png](/images/dial-customization/front-label.png)

### Applying CustomLookAndFeel

When you have finished implementing CustomLookAndFeel, include this header file and create an object of this class.

Dial.h:

```c++
#include "CustomLookAndFeel.h"
```

```c++
class Dial  : public juce::Slider
{
・・・
private:
    CustomLookAndFeel customLookAndFeel;
};
```

Then, pass this object to [setLookAndFeel()](https://docs.juce.com/master/classComponent.html#a6f2c10cd9840844a5be16e5deeef6f50) in the constructor below. Also, as a promise, pass a nullptr to setLookAndFeel() in the destructor:

Dial.cpp:

```c++
Dial::Dial()
{
・・・
//    setTextBoxStyle (juce::Slider::TextBoxBelow, false, 80, 20);
//    setColour (juce::Slider::textBoxTextColourId,    CustomColours::creamWhite);
    setColour (juce::Slider::textBoxTextColourId,    CustomColours::black);
・・・
    setLookAndFeel (&customLookAndFeel);
}

Dial::~Dial()
{
    setLookAndFeel (nullptr);
}
```

Remove setTextBoxStyle() as it is no longer needed due to the customization of getSliderLayout(). Then, change the text color of the text box from creamWhite to black.

### Building

![LookAndFeel.png](/images/dial-customization/LookAndFeel.png)

## Focus Mark

In this chapter, we will add a feature that will mark the dial when it is clicked.

![focus-mark.png](/images/dial-customization/focus-mark.png)

### Overriding paint()

Override [paint()](https://docs.juce.com/master/classSlider.html#a443749317634c0080d522d090ae991a5) and branch the process by using [hasKeyboardFocus()](https://docs.juce.com/master/classComponent.html#abf76cf5c3550c5c83bc585f86429b397) to determine if the component has KeyboardFocus, and if true, the mark will be drawn.

Dial.h:

```c++
class Dial  : public juce::Slider
{
public:
    Dial();
    ~Dial();

    void paint (juce::Graphics& g) override;
・・・
};
```

Dial.cpp:

```c++
void Dial::paint (juce::Graphics& g)
{
    juce::Slider::paint (g);

    if (hasKeyboardFocus (true))
    {
        auto bounds = getLocalBounds().toFloat();
        auto len    = juce::jmin (bounds.getHeight(), bounds.getWidth()) * 0.07f;
        auto thick  = len * 0.5f;

        auto topLeft     = bounds.getTopLeft();
        auto topRight    = bounds.getTopRight();
        auto bottomLeft  = bounds.getBottomLeft();
        auto bottomRight = bounds.getBottomRight();

        g.setColour (findColour (juce::Slider::textBoxOutlineColourId));

        juce::Path topLeftPath;
        topLeftPath.startNewSubPath (topLeft);
        topLeftPath.lineTo (topLeft.x, topLeft.y + len);
        topLeftPath.startNewSubPath (topLeft);
        topLeftPath.lineTo (topLeft.x + len, topLeft.y);
        g.strokePath (topLeftPath, juce::PathStrokeType (thick));

        juce::Path topRightPath;
        topRightPath.startNewSubPath (topRight);
        topRightPath.lineTo (topRight.x, topRight.y + len);
        topRightPath.startNewSubPath (topRight);
        topRightPath.lineTo (topRight.x - len, topRight.y);
        g.strokePath (topRightPath, juce::PathStrokeType (thick));

        juce::Path bottomLeftPath;
        bottomLeftPath.startNewSubPath (bottomLeft);
        bottomLeftPath.lineTo (bottomLeft.x, bottomLeft.y - len);
        bottomLeftPath.startNewSubPath (bottomLeft);
        bottomLeftPath.lineTo (bottomLeft.x + len, bottomLeft.y);
        g.strokePath (bottomLeftPath, juce::PathStrokeType (thick));

        juce::Path bottomRightPath;
        bottomRightPath.startNewSubPath (bottomRight);
        bottomRightPath.lineTo (bottomRight.x, bottomRight.y - len);
        bottomRightPath.startNewSubPath (bottomRight);
        bottomRightPath.lineTo (bottomRight.x - len, bottomRight.y);
        g.strokePath (bottomRightPath, juce::PathStrokeType (thick));
    }
}
```

### setWantsKeyboardFocus()

This is not enough, we need to pass true to [setWantsKeyboardFocus()](https://docs.juce.com/master/classComponent.html#a6a1f21a76b971d54870cb5c32c041055) so that the component can gain KeyboardFocus. Also, pass true to setWantsKeyboardFocus() to MainComponent so that when you click anywhere in the Editor other than the dial, the dial's KeyboardFocus will be lost.

Dial.cpp:

```c++
Dial::Dial()
{
・・・
    setWantsKeyboardFocus (true);
}
```

MainComponent.cpp:

```c++
MainComponent::MainComponent()
{
・・・
    setWantsKeyboardFocus (true);
}
```

### Building

![focus-mark.png](/images/dial-customization/focus-mark.png)

## Font Embedding

In this chapter, we will embed the Futura Medium Font and apply it to the dial.

![font-embedding.png](/images/dial-customization/font-embedding.png)

### Futura Medium Font

I'm sorry that this explanation is for macOS users.

Launch Font Book application and look for Futura Medium Font. If there is another font you like, you can choose it.

![futura-medium.png](/images/dial-customization/futura-medium.png)

### Converting TTC to TTF

Use Finder application to show where this Font is on your system:
![font-show-finder.png](/images/dial-customization/font-show-finder.png)

You can find the .ttc file in this way.
![futura-ttc.png](/images/dial-customization/futura-ttc.png)

A .ttc file is like a collection of .ttf files, and in the case of Futura.ttc, it contains the following .ttf files

- Futura-Medium.ttf
- Futura-MediumItalic.ttf
- Futura-Bold.ttf
- Futura-CondensedMedium.ttf
- Futura-CondensedExtraBold.ttf

Since we only want to use Futura-Medium.ttf, please use the tool below to break down the .ttc file into multiple .ttf files and download only this Futura-Medium.ttf.

- [transfonter](https://transfonter.org/ttc-unpack)

You can drag and drop it from the Finder to this site.
![transfonter.png](/images/dial-customization/transfonter.png)

### BinaryBuilder

If you are new to BinaryBuilder, first open BinaryBuilder.jucer in the YOURPATH/JUCE/extras/BinaryBuilder directory with Projucer.
![binarybuilder-jucer.png](/images/dial-customization/binarybuilder-jucer.png)
![open-binarybuilder-jucer.png](/images/dial-customization/open-binarybuilder-jucer.png)

Open your IDE and select "Product"→"Scheme"→"Edit scheme" from the menu at the top of the screen. Then, change Build Configuration from Debug to Release as shown below, and build.
![edit-scheme.png](/images/dial-customization/edit-scheme.png)

If the build is successful, you should find BinaryBuilder in the Release directory.
![build-binarybuilder.png](/images/dial-customization/build-binarybuilder.png)

Next, move BinaryBuilder to a directory under your path so that you can execute the command by simply typing BinaryBuilder.

```text
~
❯❯❯ mv /Users/suzukikengo/JUCE/extras/BinaryBuilder/Builds/MacOSX/build/Release/BinaryBuilder /usr/local/bin
```

Create "Resources" directory under the DialTutorial project as the source and target directories to be used by BinaryBuilder, and add Futura-Medium.ttf file that you just downloaded under "Resources" directory.
![mkdir-resources.png](/images/dial-customization/mkdir-resources.png)

You can check how to use BinaryBuilder by typing only the commands, for example:

```text
~/Desktop/DialTutorial
❯❯❯ BinaryBuilder

 BinaryBuilder!  Visit www.juce.com for more info.
 Usage: BinaryBuilder  sourcedirectory targetdirectory targetclassname [optional wildcard pattern]

 BinaryBuilder will find all files in the source directory, and encode them
 into two files called (targetclassname).cpp and (targetclassname).h, which it
 will write into the target directory supplied.

 Any files in sub-directories of the source directory will be put into the
 resultant class, but #ifdef'ed out using the name of the sub-directory (hard to
 explain, but obvious when you try it...)
```

In the case of this tutorial, the argument will look like this:

```text
~/Desktop/DialTutorial
❯❯❯ BinaryBuilder Resources Resources FuturaMedium

 BinaryBuilder!  Visit www.juce.com for more info.
Creating /Users/suzukikengo/Desktop/DialTutorial/Resources/FuturaMedium.h and /Users/suzukikengo/Desktop/DialTutorial/Resources/FuturaMedium.cpp from files in /Users/suzukikengo/Desktop/DialTutorial/Resources...

Adding FuturaMedium01_ttf: 37516 bytes

 Total size of binary data: 37516 bytes
```

After running, the .h/.cpp files for the fonts will be created in Resources directory:
![binarybuilder.png](/images/dial-customization/binarybuilder.png)

Then follow the steps below to load Resources directory into Projucer.
![add-exsisting-files.png](/images/dial-customization/add-exsisting-files.png)
![add-resources-dir.png](/images/dial-customization/add-resources-dir.png)
![added-resources-dir.png](/images/dial-customization/added-resources-dir.png)

### Setting font

Now, include FuturaMedium.h in CustomLookAndFeel.h.

```c++
#include "../Resources/FuturaMedium.h"
```

#### setDefaultSansSerifTypeface()

Create Futura Medium font by calling [createSystemTypefaceFor()](https://docs.juce.com/master/classTypeface.html#a67bf5a42f6227ba6f5c9af2a23b0bb48) and set it as the default sans-serif font by passing it to [setDefaultSansSerifTypeface()](https://docs.juce.com/master/classLookAndFeel.html#ad6764bcf3fbb1983287379f2ed034337).

CustomLookAndFeel.cpp:

```c++
CustomLookAndFeel::CustomLookAndFeel()
{
    auto futuraMediumFont = juce::Typeface::createSystemTypefaceFor (FuturaMedium::FuturaMedium01_ttf,
                                                                     FuturaMedium::FuturaMedium01_ttfSize);
    setDefaultSansSerifTypeface (futuraMediumFont);
};
```

#### setDefaultLookAndFeel()

Now, to apply this font, we just need to pass an object of the CustomLookAndFeel class to [setDefaultLookAndFeel()](https://docs.juce.com/master/classLookAndFeel.html#a0d2cc7f39cb3804d68a6fd2a723d05a4) in MainComponent.

MainComponent.h:

```c++
#inlcude "CustomLookAndFeel.h"
```

```c++
class MainComponent  : public juce::Component
{
・・・
private:
・・・
    CustomLookAndFeel customLookAndFeel;
・・・
};
```

MainComponent.cpp:

```c++
MainComponent::MainComponent()
{
・・・
    juce::LookAndFeel::setDefaultLookAndFeel (&customLookAndFeel);
}

MainComponent::~MainComponent()
{
    juce::LookAndFeel::setDefaultLookAndFeel (nullptr);
}
```

![setDefaultLookAndFeel.png](/images/dial-customization/setDefaultLookAndFeel.png)

### Building

Oops, the text was too small, so make it a little bigger before you build it.

CustomLookAndFeel.cpp:

```c++
juce::Label* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
・・・
    l->setFont (20.0f);
・・・
}

```

![font-embedding.png](/images/dial-customization/font-embedding.png)

## Drag Sensitivity

In this chapter, we will add a feature to multiply the sensitivity by 0.1 while dragging the mouse, by pressing the Shift key. This feature will allow you to fine tune the value of the dial.
![drag-sensitivity](/images/dial-customization/drag-sensitivity.gif)

### isShiftDown()

[isShiftDown()](https://docs.juce.com/master/classModifierKeys.html#afd9f4558046eccad2c3a3366c6bcf6b0) is a member function that returns true if the Shift key's flag is set, and you can access key modifiers associated with mouse events through [mods](https://docs.juce.com/master/classMouseEvent.html#aaabc365b704e243b193b41113d4e50de).

Override [mouseDrag()](https://docs.juce.com/master/classSlider.html#a6e117b6ba93f9a1954c52be4b4dfc873) and make it conditional by isShiftDown() so that the first argument of setVelocityModeParameters() is set to 0.1 if true, and 1.0 as usual if false.

```c++
class Dial  : public juce::Slider
{
public:
・・・
    void mouseDrag (const juce::MouseEvent& event) override;
```

```c++
void Dial::mouseDrag (const juce::MouseEvent& event)
{
    juce::Slider::mouseDrag (event);

    if (event.mods.isShiftDown())
        setVelocityModeParameters (0.1, 1, 0.1, false);
    else
        setVelocityModeParameters (1.0, 1, 0.1, false);
}
```

### Building

![drag-sensitivity](/images/dial-customization/drag-sensitivity.gif)

## Edit Mode

In this chapter, we will add a mode that allows you to edit the text box.

![edit-mode.png](/images/dial-customization/edit-mode.png)

### Customizing label

Since the dial text box is a juce::Label object returned by createSliderTextBox(), prepare a CustomLabel class and change the return value of this function to an object of this class.

First, I will show the overall implementation of CustomLabel class, and then explain each member function.

CustomLookAndFeel.h:

```c++
class CustomLookAndFeel : public juce::LookAndFeel_V4
{
public:
    struct CustomLabel : public juce::Label
    {
        static juce::String initialPressedKey;

        juce::TextEditor* createEditorComponent() override
        {
            auto* ed = juce::Label::createEditorComponent();

            ed->setJustification (juce::Justification::centred);
            ed->setColour (juce::TextEditor::backgroundColourId, juce::Colours::transparentWhite);
            ed->setInputRestrictions (5, "0123456789.");
            ed->setIndents (4, 0);

            return ed;
        }

        void editorShown (juce::TextEditor* editor) override
        {
            getParentComponent()->setMouseCursor (juce::MouseCursor::NoCursor);
            editor->clear();
            editor->setText (initialPressedKey);
        }

        void editorAboutToBeHidden (juce::TextEditor * ed) override
        {
            getParentComponent()->setMouseCursor (juce::MouseCursor::NormalCursor);
        }
    };
・・・
```

CustomLookAndFeel.cpp

```c++
juce::String CustomLookAndFeel::CustomLabel::initialPressedKey = "";

CustomLookAndFeel::CustomLookAndFeel()
{
・・・
```

#### createEditorComponent()

Override [createEditorComponent()](https://docs.juce.com/master/classLabel.html#a87b2717e5c855b64346b70a908eabc13) to set the details of the TextEditor object, which is called when the text box label goes into edit mode.

```c++
juce::TextEditor* createEditorComponent() override
{
    auto* ed = juce::Label::createEditorComponent();

    ed->setJustification (juce::Justification::centred);
    ed->setColour (juce::TextEditor::backgroundColourId, juce::Colours::transparentWhite);
    ed->setInputRestrictions (5, "0123456789.");
    ed->setIndents (4, 0);

    return ed;
}
```

If you don't use [setInputRestrictions()](https://docs.juce.com/master/classTextEditor.html#aeda595bb13ea799cce7ac121cf432f26), you can have non-numeric characters, and also an unlimited number of input characters, so it will look like the following:
![setInputRestrictions.png](/images/dial-customization/setInputRestrictions.png)

This time we limit the number of characters we can enter to five, and the only characters we can enter are numbers and a period representing a decimal point.

Then it is also important to use [setIndents()](https://docs.juce.com/master/classTextEditor.html#a33de8e25ff72f21f74fa4cb22343e3bf). If you do not use this function, as shown in the left dial below, the position of the character you are editing will be set much lower:
![setIndent.png](/images/dial-customization/setIndent.png)

#### editorShown()

[editorShown()](https://docs.juce.com/master/classLabel.html#a5260dfecf51d5f4822ea7072cb2d4cb6) is a function that is called when a TextEditor object appears.

```c++
void editorShown (juce::TextEditor* editor) override
{
    getParentComponent()->setMouseCursor (juce::MouseCursor::NoCursor);
    editor->clear();
    editor->setText (initialPressedKey);
}
```

By default, when this function is called, the initial value is assigned as shown below:

![not-clear.png](/images/dial-customization/not-clear.png)

It is not cool to leave it like this, so we call [clear()](https://docs.juce.com/master/classTextEditor.html#a63f9bab8dcbec46cf840bf199e7768a1) to clear the initial value. We also want the initial value to be the value of the first numeric key entered, so we pass a static variable called initialPressedKey to [setText()](https://docs.juce.com/master/classTextEditor.html#a9fd6243466c8122ccfffc03fa39f6c4f). This variable will be explained later.

#### editorAboutToBeHidden()

[editorAboutToBeHidden()](https://docs.juce.com/master/classLabel.html#a94b4571677d5ac3c0ebfc7d171aa9ba6) is a function that is called when the editing mode is terminated. editorShown() implemented the process of hiding the mouse cursor, so here we implement the process of making the mouse cursor visible.

```c++
void editorAboutToBeHidden (juce::TextEditor * ed) override
{
    getParentComponent()->setMouseCursor (juce::MouseCursor::NormalCursor);
}
```

#### createSliderTextBox()

Change the return value of createSliderTextBox() from juce::Label to CustomLabel.

```c++
class CustomLookAndFeel : public juce::LookAndFeel_V4
{
public:
・・・
    CustomLabel* createSliderTextBox (juce::Slider& slider) override;
```

```c++
CustomLookAndFeel::CustomLabel* CustomLookAndFeel::createSliderTextBox (juce::Slider& slider)
{
    auto* l = new CustomLabel();

    l->setJustificationType (juce::Justification::centred);
    l->setColour (juce::Label::textColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::textWhenEditingColourId, slider.findColour (juce::Slider::textBoxTextColourId));
    l->setColour (juce::Label::outlineWhenEditingColourId, juce::Colours::transparentWhite);
    l->setInterceptsMouseClicks (false, false);
    l->setFont (20.0f);

    return l;
}
```

### Customizing caret

To change the color of the caret from the default blue to red, override [createCaretComponent()](https://docs.juce.com/master/classLookAndFeel__V2.html#a8dbedf25e46dffd17384ae01e822dac4).

```c++
class CustomLookAndFeel : public juce::LookAndFeel_V4
{
public:
・・・
    juce::CaretComponent* createCaretComponent (juce::Component* keyFocusOwner) override;
};
```

```c++
juce::CaretComponent* CustomLookAndFeel::createCaretComponent (juce::Component* keyFocusOwner)
{
    auto caret = new juce::CaretComponent (keyFocusOwner);

    caret->setColour (juce::CaretComponent::caretColourId, juce::Colours::red);

    return caret;
}
```

![custom-caret.png](/images/dial-customization/custom-caret.png)

### Overriding keyPressed()

Override [keyPressed()](https://docs.juce.com/master/classComponent.html#ab063a5c631854864da09106abec78a86) so that the dial can detect the keystrokes and switch to edit mode.

```c++
class Dial  : public juce::Slider
{
public:
・・・
    bool keyPressed (const juce::KeyPress& k) override;

```

It responds only to numeric keys, and when a numeric key is pressed, the value of that key is assigned to the static variable initialPressedKey. This variable will be the initial value when the TextEditor object is displayed. If this is not implemented, the first numeric key pressed will only be treated as a trigger to switch to edit mode, and the value of that key will be ignored.

```c++
bool Dial::keyPressed (const juce::KeyPress& k)
{
    char numChars[] = "0123456789";

    for (auto numChar : numChars)
    {
        if (k.isKeyCode (numChar))
        {
            CustomLookAndFeel::CustomLabel::initialPressedKey = juce::String::charToString (numChar);
            showTextBox();

            return true;
        }
    }

    return false;
}
```

In the process of converting to GIF the redness of the caret was lost, but in fact it is red:
![edit-mode.gif](/images/dial-customization/edit-mode.gif)

### Building

![edit-mode.png](/images/dial-customization/edit-mode.png)

## Mouse Cursor

In this chapter, we will make some minor settings for the mouse cursor when controlling Dial.

![mouse-cursor.gif](/images/dial-customization/mouse-cursor.gif)

### mouseDown()

In the current Dial, the mouse cursor disappears when you start dragging, but not the moment you click. To make the mouse cursor disappear even at this moment, override [mouseDown()](https://docs.juce.com/master/classSlider.html#a66f2c67d6de570fa0d123ae2b9b394f7) and pass [juce::MouseCursor::NoCursor](https://docs.juce.com/master/classMouseCursor.html#a5de22a8c3eb06827ac11352e76eb9a97a765994c253a794c44b2a919f39738917) to [setMouseCursor()](https://docs.juce.com/master/classComponent.html#ab8c631fc3fb881ca94a9b7edcf58636f).

```c++
class Dial  : public juce::Slider
{
public:
・・・
    void mouseDown (const juce::MouseEvent& event) override;
```

```c++
void Dial::mouseDown (const juce::MouseEvent& event)
{
    juce::Slider::mouseDown (event);

    setMouseCursor (juce::MouseCursor::NoCursor);
}
```

### mouseUp()

Then, we pass [juce::MouseCursor::NormalCursor](https://docs.juce.com/master/classMouseCursor.html#a5de22a8c3eb06827ac11352e76eb9a97aa05a8960e2a3e32bfad68fdcb31a1511) to setMouseCursor() so that the mouse cursor will appear when we have finished clicking or dragging.

```c++
class Dial  : public juce::Slider
{
public:
・・・
    void mouseUp (const juce::MouseEvent& event) override;
```

```c++
void Dial::mouseUp (const juce::MouseEvent& event)
{
    juce::Slider::mouseUp (event);

    juce::Desktop::getInstance().getMainMouseSource().setScreenPosition (event.source.getLastMouseDownPosition());

    setMouseCursor (juce::MouseCursor::NormalCursor);
}
```

Also, we pass the value returned by [getLastMouseDownPosition()](https://docs.juce.com/master/classMouseInputSource.html#a800fb252a9589738a7fe264fc9161759), which is the last mouse clicked position, to [setScreenPosition()](https://docs.juce.com/master/classMouseInputSource.html#adb92bc833aaf6e7cb15c3f1f01fd7f09) to move the mouse cursor position. This will prevent the user from being confused by the cursor appearing in an unexpected place when the drag is finished.

Before(left) & After(right):

![setScreenpos.gif](/images/dial-customization/setScreenpos.gif)

## Summary

In the tutorial, I explained the following:

- How to create a basic dial
- How to customize LookAndFeel class
- How to embed fonts using BinaryBuilder
- How to implement essential features such as Edit Mode

Thank you for reading to the end. If you find any mistakes in this article, please let me know via Twitter DM or other means. Happy coding!

## References

- [JUCE: Class Index](https://docs.juce.com/master/index.html)
- [[Guide] Juce Font Embedding (2019)](https://forum.juce.com/t/guide-juce-font-embedding-2019/35041)
- [Modern custom font guide?](https://forum.juce.com/t/modern-custom-font-guide/20841)
