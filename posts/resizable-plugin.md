---
title: 'Resizable Plugin'
createdDate: '2022-01-27'
updatedDate: '2022-01-27'
thumbnail: '/images/resizable-plugin/resizable-plugin.png'
---

## Introduction

![resizable-plugin.png](/images/resizable-plugin/resizable-plugin.png)

## Making the editor resizable

```c++:PluginEditor.cpp
    setResizable (true, true);
    setSize (560, 280);
```

![resizing.gif](/images/resizable-plugin/resizing.gif)

## Setting resize limits

```c++:PluginEditor.cpp
    setResizable (true, true);
    setResizeLimits (400, 200, 1200, 600);
    setSize (560, 280);
```

## Keeping fixed aspect ratio

```c++:PluginEditor.cpp
    const double ratio = 560.0 / 280.0;
    setResizable (true, true);
    setResizeLimits (400,  juce::roundToInt (400.0 / ratio),
                     1200, juce::roundToInt (1200.0 / ratio));
    getConstrainer()->setFixedAspectRatio (ratio);
    setSize (560, 280);
```

![keeping-fixed-ratio.png](/images/resizable-plugin/keeping-fixed-ratio.gif)

## Changing the color of CornerResizer

![default-corner-resizer.png](/images/resizable-plugin/default-corner-resizer.png)

```c++:MyLookAndFeel.h
class MyLookAndFeel : public juce::LookAndFeel_V4
{
public:
・・・
    void drawCornerResizer (juce::Graphics& g, int w, int h, bool isMouseOver, bool isMouseDragging) override;
};

```

```c++:MyLookAndFeel.cpp
void MyLookAndFeel::drawCornerResizer (juce::Graphics& g, int w, int h, bool /*isMouseOver*/, bool /*isMouseDragging*/)
{
    auto lineThickness = jmin ((float) w, (float) h) * 0.07f;

    for (float i = 0.0f; i < 1.0f; i += 0.3f)
    {
        g.setColour (MyColours::blackGrey);

        g.drawLine ((float) w * i,
                    (float) h + 1.0f,
                    (float) w + 1.0f,
                    (float) h * i,
                    lineThickness);

        g.setColour (MyColours::blackGrey);

        g.drawLine ((float) w * i + lineThickness,
                    (float) h + 1.0f,
                    (float) w + 1.0f,
                    (float) h * i + lineThickness,
                    lineThickness);
    }
}
```

![custom-corner-resizer.png](/images/resizable-plugin/custom-corner-resizer.png)

## Summary

## References
