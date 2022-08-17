---
title: 'juce::Path::add* Examples'
createdDate: '2021-09-26'
updatedDate: '2022-08-17'
thumbnail: '/images/juce-path-add-examples/juce-path-add.png'
---

## Default Setting

![default-setting.png](/images/juce-path-add-examples/default-setting.png)

```c++:MainComponent.cpp
#include "MainComponent.h"

MainComponent::MainComponent()
{
    setSize (400, 400);
}

MainComponent::~MainComponent()
{
}

void MainComponent::paint (juce::Graphics& g)
{
    const juce::Colour blue  { 0xff6dd4ff };
    const juce::Colour black { 0xff141414 };
    const juce::Colour grey  { 0xff353535 };

    g.fillAll (black);
    g.setColour (grey.withAlpha (0.75f));

    for (int i = 0; i < getWidth(); i += 10)
        g.drawVerticalLine (i, getY(), getBottom());

    for (int i = 0; i < getHeight(); i += 10)
        g.drawHorizontalLine (i, getX(), getRight());
}
void MainComponent::resized()
{
}
```

## juce::Path::add\*

### addRectangle

![add-rectangle.png](/images/juce-path-add-examples/add-rectangle.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addRectangle (getLocalBounds().reduced (100));

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addRectangle - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#ad335f4ab5ece92001a69022f4ec6a38e)

### addRoundedRectangle

![add-rounded-rectangle.png](/images/juce-path-add-examples/add-rounded-rectangle.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addRoundedRectangle (getLocalBounds().reduced (100), 50.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addRoundedRectangle - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a654fb058593e963b8268476ec348e7ce)

### addTriangle

![add-triangle.png](/images/juce-path-add-examples/add-triangle.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addTriangle (juce::Point<float> (100.0f, 100.0f),
                      juce::Point<float> (100.0f, 300.0f),
                      juce::Point<float> (300.0f, 300.0f));

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addTriangle - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a5916146ffb0f70bbba6a4c72b7f0c3f1)

### addQuadrilateral

![add-quadrilateral.png](/images/juce-path-add-examples/add-quadrilateral.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addQuadrilateral (50.0f,  50.0f,
                           80.0f,  350.0f,
                           250.0f, 330.0f,
                           350.0f, 100.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addQuadrilateral - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#aced2dafcb8a12f73fcffe032def577be)

### addEllipse

![add-ellipse.png](/images/juce-path-add-examples/add-ellipse.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addEllipse (getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f));

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addEllipse - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a34e131589e312853641df2fd6ca22579)

### addArc

![add-arc.png](/images/juce-path-add-examples/add-arc.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    auto bounds = getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f);
    juce::Path path;
    path.addArc (bounds.getX(),
                 bounds.getY(),
                 bounds.getWidth(),
                 bounds.getHeight(),
                 juce::MathConstants<float>::halfPi,
                 juce::MathConstants<float>::twoPi,
                 true);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addArc - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a1486b650a586f1be84e2decc47bcc844)

### addCentredArc

![add-centred-arc.png](/images/juce-path-add-examples/add-centred-arc.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    auto bounds = getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f);
    juce::Path path;
    path.addCentredArc (bounds.getCentreX(),
                        bounds.getCentreY(),
                        bounds.getWidth() * 0.5f,
                        bounds.getHeight() * 0.5f,
                        juce::MathConstants<float>::pi,
                        juce::MathConstants<float>::halfPi,
                        juce::MathConstants<float>::twoPi,
                        true);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addCentredArc - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#ad72e6b6e7a058d521f26443bbddca420)

### addPieSegment

![add-pie-segment.png](/images/juce-path-add-examples/add-pie-segment.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    auto bounds = getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f);
    juce::Path path;
    path.addPieSegment (bounds,
                        juce::MathConstants<float>::halfPi,
                        juce::MathConstants<float>::twoPi,
                        0.5f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addPieSegment - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#aaf811f4a472bb525e05ec7e5c72c8d85)

### addLineSegment

![add-line-segment.png](/images/juce-path-add-examples/add-line-segment.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addLineSegment (juce::Line<float> { 50.0f,  100.0f, 200.0f, 100.0f }, 10.0f);
    path.addLineSegment (juce::Line<float> { 100.0f, 200.0f, 250.0f, 200.0f }, 10.0f);
    path.addLineSegment (juce::Line<float> { 150.0f, 300.0f, 300.0f, 300.0f }, 10.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addLineSegment - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a88f8efbb76ff2f281aa528e3ad2b63a7)

### addArrow

![add-arrow.png](/images/juce-path-add-examples/add-arrow.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addArrow (juce::Line<float> { 50.0f, 50.0f, 350.0f, 350.0f },
                   1.0f, 60.0f, 30.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addArrow - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#abd4b324342831ba94b8882b5310e5ce4)

### [addPolygon()](https://docs.juce.com/master/classPath.html#a1a2772ae9e2b056533aa6ff2f2cc2d96)

![add-polygon.png](/images/juce-path-add-examples/add-polygon.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    juce::Path path;
    path.addPolygon (getBounds().toFloat().getCentre(),
                     5, 150.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addPolygon - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a1a2772ae9e2b056533aa6ff2f2cc2d96)

### addStar

![add-star.png](/images/juce-path-add-examples/add-star.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    juce::Path path;
    path.addStar (getBounds().toFloat().getCentre(),
                  8, 20.0f, 150.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addStar - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a90d9510c290d3028f5115d7759472811)

### addBubble

![add-bubble.png](/images/juce-path-add-examples/add-bubble.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
・・・
    auto bounds = getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 100.0f);

    juce::Path path;
    path.addBubble (bounds,
                    bounds.expanded (0.0f, 50.0f),
                    juce::Point<float> { 300.0f, bounds.getBottom() + 49.9f },
                    10.0f, 15.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType { 1.0f });
}
```

- [addBubble - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#a755bbc5fd9a2872ed164cb9ca111c470)

### addPath

![add-path.png](/images/juce-path-add-examples/add-path.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    juce::Path pathA;
    pathA.addEllipse (getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f));

    juce::Path pathB;
    pathB.addEllipse (getLocalBounds().toFloat().withSizeKeepingCentre (150.0f, 150.0f));
    pathB.addPath (pathA);

    g.setColour (blue);
    g.strokePath (pathB, juce::PathStrokeType { 1.0f });
}
```

- [addPath - JUCE: Path Class Reference](https://docs.juce.com/master/classPath.html#ad2d6833a36f348ab33a83309e3956c00)
