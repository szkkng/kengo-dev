---
title: 'Draggable Component'
date: '2021-12-30'
thumbnail: '/images/draggable-component/draggable-component.png'
---

## Introduction

![draggable-component.png](/images/draggable-component/draggable-component.png)

![finish.gif](/images/draggable-component/finish.gif)

### Prerequisites

![new-project.png](/images/draggable-component/new-project.png)

![add-files.png](/images/draggable-component/add-files.png)

```C++:GreyRect.h
#pragma once

#include <JuceHeader.h>

class GreyRect  : public juce::Component
{
public:
    GreyRect()
    {
        addAndMakeVisible (blueRect);
    };

    void paint (juce::Graphics& g) override
    {
        auto grey = juce::Colour::fromFloatRGBA (0.28f, 0.28f, 0.28f, 1.0f);
        g.fillAll (grey.withAlpha (0.1f));

        g.setColour (grey);
        g.drawRect (getLocalBounds(), 2);
    }

    void resized () override
    {
        blueRect.setBounds (getLocalBounds().withSizeKeepingCentre (40, 40));
    }

private:
   struct  DraggableComp : public juce::Component
   {
       void paint (juce::Graphics& g) override
       {
           auto bounds = getLocalBounds().reduced (1);
           auto blue = juce::Colour::fromFloatRGBA (0.42f, 0.83f, 1.0f,  1.0f);

           g.setColour (blue.withAlpha (0.2f));
           g.fillRect (bounds);

           g.setColour (blue);
           g.drawRect (bounds, 2);
       }
   };

   DraggableComp blueRect;
};
```

![grey-and-blue-rect.png](/images/draggable-component/grey-and-blue-rect.png)

## ComponentDragger

![drag-component.gif](/images/draggable-component/drag-component.gif)

### Creating the object

```C++:GreyRect.h
struct DraggableComp  : public juce::Component
{
    juce::ComponentDragger dragger;
・・・
};
```

### startDraggingComponent()

```C++:GreyRect.h
・・・
struct DraggableComp  : public juce::Component
{
・・・
	void mouseDown (const juce::MouseEvent& event) override
	{
		dragger.startDraggingComponent (this, event);
	}
};
```

### dragComponent()

```C++:GreyRect.h
struct DraggableComp  : public juce::Component
{
・・・
	void mouseDrag (const juce::MouseEvent& event) override
	{
		dragger.dragComponent (this, event, nullptr);
	}
};
```

### Building

![drag-component.gif](/images/draggable-component/drag-component.gif)

## ComponentBoundsConstrainer

![disappearing-rect.gif](/images/draggable-component/disappearing-rect.gif)

### Creating the object

```C++:GreyRect.h
struct DraggableComp  : public juce::Component
{
	juce::ComponentDragger dragger;
	juce::ComponentBoundsConstrainer constrainer;
・・・
	void mouseDrag (const juce::MouseEvent& event) override
	{
		dragger.dragComponent (this, event, &constrainer);
	}
};
```

### setMinimumOnscreenAmounts()

```C++:GreyRect.h
struct DraggableComp : public juce::Component
{
	juce::ComponentDragger dragger;
	juce::ComponentBoundsConstrainer constrainer;

    DraggableComp()
    {
    	constrainer.setMinimumOnscreenAmounts (20, 20, 20, 20);
    }
・・・
};
```

![constrainer1.png](/images/draggable-component/constrainer1.png)

```C++:GreyRect.h
・・・
    DraggableComp()
    {
    	constrainer.setMinimumOnscreenAmounts (40, 40, 40, 40);
    }
・・・
```

![constrainer2.png](/images/draggable-component/constrainer2.png)

### Building

![finish.gif](/images/draggable-component/finish.gif)

## Summary

## References

- [ComponentDragger Class Reference - JUCE](https://docs.juce.com/master/classComponentDragger.html)
- [ComponentBoundsConstrainer Class Reference - JUCE](https://docs.juce.com/master/classComponentBoundsConstrainer.html)
