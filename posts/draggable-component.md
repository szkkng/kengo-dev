---
title: 'Draggable Component'
date: '2021-12-30'
thumbnail: '/images/draggable-component/draggable-component.png'
---

## Introduction

![draggable-component.png](/images/draggable-component/draggable-component.png)

In this tutorial, I will explain how to create a draggable component using ComponentDragger and ComponentBoundsConstrainer classes. As shown below, the blue rectangle can be dragged inside the grey rectangle.

![finish.gif](/images/draggable-component/finish.gif)

The source code is available from the repository below:

[Draggable Component - GitHub](https://github.com/szkkng/draggable-component)

### Prerequisites

Create a project named DraggableComponent.
![new-project.png](/images/draggable-component/new-project.png)

Create a new header file named GreyRect.
![add-files.png](/images/draggable-component/add-files.png)

Add the following code to GreyRect.h

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

In MainComponent.h, include this header file and create an object of GreyRect class.

```C++:MainComponent.h
#include "GreyRect.h"
```

```C++:MainComponent.h
class MainComponent  : public juce::Component
{
・・・
private:
    GreyRect greyRect;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MainComponent)
};
```

Add the following code in MainComponent.cpp and build this project.

```C++:MainComponent.cpp
MainComponent::MainComponent()
{
    setSize (600, 400);

    addAndMakeVisible (greyRect);
}

void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    g.fillAll (black);
}

void MainComponent::resized()
{
    greyRect.setBounds (getLocalBounds().withSizeKeepingCentre (400, 250));
}
```

As shown below, a gray rectangle and a blue rectangle are drawn, and the blue one cannot be dragged yet.
![grey-and-blue-rect.png](/images/draggable-component/grey-and-blue-rect.png)

## ComponentDragger

In this chapter, we will make the blue rectangle draggable.

![drag-component.gif](/images/draggable-component/drag-component.gif)

### Creating the object

Create an object of [ComponentDragger](https://docs.juce.com/master/classComponentDragger.html) class in DraggableComp struct.

```C++:GreyRect.h
struct DraggableComp  : public juce::Component
{
    juce::ComponentDragger dragger;
・・・
};
```

### startDraggingComponent()

In mouseDown() callback, call [startDraggingComponent()](https://docs.juce.com/master/classComponentDragger.html#a3a6ae550729873ec7fa31a48bc79a352) to prepare for dragging.

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

In mouseDrag() callback, call [dragComponent()](https://docs.juce.com/master/classComponentDragger.html#af2ebcd662f3279b373bfaf035f2c269e) to move the component.

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

As shown below, you can drag the blue rectangle.

![drag-component.gif](/images/draggable-component/drag-component.gif)

However, you would be able to drag this to outside the border of the gray rectangle.
![disappearing-rect.gif](/images/draggable-component/disappearing-rect.gif)

## ComponentBoundsConstrainer

In this chapter, we will limit the blue rectangle's position and keep it on-screen.

![finish.gif](/images/draggable-component/finish.gif)

### Creating the object

Create an object of [ComponentBoundsConstrainer](https://docs.juce.com/master/classComponentBoundsConstrainer.html) class in DraggableComp struct, and pass this object to dragComponent().

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

In the constructor, call [setMinimumOnscreenAmounts()](https://docs.juce.com/master/classComponentBoundsConstrainer.html#aff1abf331d36ac67df318f999beccc0a) to set the amount by which the blue rectangle is allowed to go off-screen.

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

In this case, we will allow the blue rectangle to go off-screen up to half its length.

![constrainer1.png](/images/draggable-component/constrainer1.png)

Therefore, by passing the length of the width of the blue rectangle to this function, we can restrict the position to within the gray rectangle.

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
