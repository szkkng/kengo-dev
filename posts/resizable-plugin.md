---
title: 'Resizable Plugin'
createdDate: '2022-01-28'
updatedDate: '2022-01-28'
thumbnail: '/images/resizable-plugin/resizable-plugin.png'
---

## Introduction

In this article, I will show you how to make the plugin editor resizable with keeping fixed aspect ratio. For that, I will use [Simple Reverb](https://github.com/szkkng/simple-reverb), which has already implemented this feature, as an example. It will be easier to understand if you download this source code and check the part of the code that implements this feature.

![resizable-plugin.png](/images/resizable-plugin/resizable-plugin.png)

## Making the editor resizable

First, in order to make the editor resizable, call [setResizable()](https://docs.juce.com/master/classAudioProcessorEditor.html#a3d36f7385146270fc752ce17418f115a) in the constructor of PluginEditor. In the following case, CornerResizer component will appear in the bottom right corner of the editor and you will be able to resize the editor unlimitedly.

```c++:PluginEditor.cpp
    setResizable (true, true);
    setSize (560, 280);
```

## Setting resize limits

If you want to limit the resizing of the editor, call [setResizeLimits()](https://docs.juce.com/master/classAudioProcessorEditor.html#a4f52a3b54d9a54e9b0b72dffc5030426) in addition. In the following case, the minimum size will be set to 400 × 200, and the maximum size will be set to 1200 × 600.

```c++:PluginEditor.cpp
    setResizable (true, true);
    setResizeLimits (400, 200, 1200, 600);
    setSize (560, 280);
```

## Keeping fixed aspect ratio

If you want to resize the editor keeping fixed aspect ratio, call [setFixedAspectRatio()](https://docs.juce.com/master/classComponentBoundsConstrainer.html#ad2dc5063fde4f7eec915c29eb9a78d46). In the following case, you can resize the editor keeping the width twice as long as the height.

```c++:PluginEditor.cpp
    const double ratio = 560.0 / 280.0;
    setResizable (true, true);
    setResizeLimits (400,  juce::roundToInt (400.0 / ratio),
                     1200, juce::roundToInt (1200.0 / ratio));
    getConstrainer()->setFixedAspectRatio (ratio);
    setSize (560, 280);
```

## Changing the color of CornerResizer

Finally, I will show you how to change the color of CornerResizer. By default, it is set to white as shown below.

![default-corner-resizer.png](/images/resizable-plugin/default-corner-resizer.png)

Override [drawCornerResizer()](https://docs.juce.com/master/classLookAndFeel__V2.html#a38e789cd65e11d1cb4c23e4aa2a2f718) to change the color from the default white to a customized color.

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

Now you just need to apply this customized LookAndFeel to the editor. After building, it will look like the following:

![custom-corner-resizer.png](/images/resizable-plugin/custom-corner-resizer.png)

## Summary

In this tutorial, I explained the following:

- how to make the plugin editor resizable keeping fixed aspect ratio
- how to customize the color of CornerResizer component

## References

- [JUCE: Class Index](https://docs.juce.com/master/index.html)
- [Best way to implement resizable plugin - JUCE Forum](https://forum.juce.com/t/best-way-to-implement-resizable-plugin/12644)
- [setResizable plugin - JUCE Forum](https://forum.juce.com/t/setresizable-plugin/26361)
- [Resizable Plugin - how to? - Audio Plugins - JUCE Forum](https://forum.juce.com/t/resizable-plugin-how-to/45043)
