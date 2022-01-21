---
title: 'juce::Path::add* Examples'
createdDate: '2021-09-26'
updatedDate: '2021-09-26'
thumbnail: '/images/juce-path-add-examples/juce-path-add-examples.png'
---

## juce::Path::add\*

### [addRectangle()](https://docs.juce.com/master/classPath.html#ad335f4ab5ece92001a69022f4ec6a38e)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addRectangle (getLocalBounds().reduced (100));

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addRectangle.png](/images/juce-path-add-examples/addRectangle.png)

### [addRoundedRectangle()](https://docs.juce.com/master/classPath.html#a654fb058593e963b8268476ec348e7ce)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addRoundedRectangle (getLocalBounds().reduced (100), 80.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addRoundedRectangle.png](/images/juce-path-add-examples/addRoundedRectangle.png)

### [addTriangle()](https://docs.juce.com/master/classPath.html#a5916146ffb0f70bbba6a4c72b7f0c3f1)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addTriangle (juce::Point<float> (400.0f, 150.0f),
                      juce::Point<float> (285.0f, 350.0f),
                      juce::Point<float> (515.0f, 350.0f));

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addTriangle.png](/images/juce-path-add-examples/addTriangle.png)

### [addQuadrilateral()](https://docs.juce.com/master/classPath.html#aced2dafcb8a12f73fcffe032def577be)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addQuadrilateral (150.0f, 100.0f,
                           200.0f, 400.0f,
                           650.0f, 400.0f,
                           650.0f, 200.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addQuadrilateral.png](/images/juce-path-add-examples/addQuadrilateral.png)

### [addEllipse()](https://docs.juce.com/master/classPath.html#a34e131589e312853641df2fd6ca22579)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addEllipse (getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f));

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addEllipse.png](/images/juce-path-add-examples/addEllipse.png)

### [addArc()](https://docs.juce.com/master/classPath.html#a1486b650a586f1be84e2decc47bcc844)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

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
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addArc.png](/images/juce-path-add-examples/addArc.png)

### [addCentredArc()](https://docs.juce.com/master/classPath.html#ad72e6b6e7a058d521f26443bbddca420)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    auto bounds = getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f);
    juce::Path path;
    path.addCentredArc (bounds.getCentreX(),
                        bounds.getCentreY(),
                        bounds.getWidth() / 2.0f,
                        bounds.getHeight() / 2.0f,
                        juce::MathConstants<float>::pi / 4.0f,
                        juce::MathConstants<float>::halfPi,
                        juce::MathConstants<float>::twoPi,
                        true);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addCentredArc.png](/images/juce-path-add-examples/addCentredArc.png)

### [addPieSegment()](https://docs.juce.com/master/classPath.html#aaf811f4a472bb525e05ec7e5c72c8d85)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    auto bounds = getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f);
    juce::Path path;
    path.addPieSegment (bounds,
                        juce::MathConstants<float>::halfPi,
                        juce::MathConstants<float>::twoPi,
                        0.5f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addPieSegment.png](/images/juce-path-add-examples/addPieSegment.png)

### [addLineSegment()](https://docs.juce.com/master/classPath.html#a88f8efbb76ff2f281aa528e3ad2b63a7)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addLineSegment (juce::Line<float> (juce::Point<float> (200.0f, 250.0f), juce::Point<float> (350.0f, 250.0f)),
                         5.0f);
    path.addLineSegment (juce::Line<float> (juce::Point<float> (450.0f, 250.0f), juce::Point<float> (600.0f, 250.0f)),
                         5.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addLineSegment.png](/images/juce-path-add-examples/addLineSegment.png)

### [addArrow()](https://docs.juce.com/master/classPath.html#abd4b324342831ba94b8882b5310e5ce4)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addArrow (juce::Line<float> (juce::Point<float> (200.0f, 250.0f), juce::Point<float> (600.0f, 250.0f)),
                   1.0f, 60.0f, 30.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addArrow.png](/images/juce-path-add-examples/addArrow.png)

### [addPolygon()](https://docs.juce.com/master/classPath.html#a1a2772ae9e2b056533aa6ff2f2cc2d96)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addPolygon (getBounds().toFloat().getCentre(),
                     5, 150.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addPolygon.png](/images/juce-path-add-examples/addPolygon.png)

### [addStar()](https://docs.juce.com/master/classPath.html#a90d9510c290d3028f5115d7759472811)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path path;
    path.addStar (getBounds().toFloat().getCentre(),
                  8, 20.0f, 150.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addStar.png](/images/juce-path-add-examples/addStar.png)

### [addBubble()](https://docs.juce.com/master/classPath.html#a755bbc5fd9a2872ed164cb9ca111c470)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    auto bounds = getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 100.0f);
    juce::Path path;
    path.addBubble (bounds,
                    bounds.expanded (0.0f, 50.0f),
                    juce::Point<float> (500.0f, bounds.getBottom() + 49.9f),
                    10.0f, 15.0f);

    g.setColour (blue);
    g.strokePath (path, juce::PathStrokeType (1.5f));
}
```

![addBubble.png](/images/juce-path-add-examples/addBubble.png)

### [addPath()](https://docs.juce.com/master/classPath.html#ad2d6833a36f348ab33a83309e3956c00)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    juce::Path pathA;
    pathA.addEllipse (getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 300.0f));

    juce::Path pathB;
    pathB.addEllipse (getLocalBounds().toFloat().withSizeKeepingCentre (150.0f, 150.0f));
    pathB.addPath (pathA);

    g.setColour (blue);
    g.strokePath (pathB, juce::PathStrokeType (1.5f));
}
```

![addPath.png](/images/juce-path-add-examples/addPath.png)
