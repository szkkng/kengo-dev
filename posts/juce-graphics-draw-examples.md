---
title: 'juce::Graphics::draw* Examples'
createdDate: '2021-09-26'
updatedDate: '2021-09-26'
thumbnail: '/images/juce-graphics-draw-examples/juce-graphics-draw-examples.png'
---

## juce::Graphics::draw\*

### [drawSingleLineText()](https://docs.juce.com/master/classGraphics.html#a4c3b91876001e27ad256f9a381a8f58f)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.setFont (25.0f);
    g.drawSingleLineText ("Suzuki Kengo", 300, 200,
                          juce::Justification::right);
}
```

![drawSingleLineText.png](/images/juce-graphics-draw-examples/drawSingleLineText.png)

### [drawMultiLineText()](https://docs.juce.com/master/classGraphics.html#ae6ae0dc5e9e1956af5998c18e0955a56)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.setFont (25.0f);
    g.drawMultiLineText ("Suzuki Kengo", 350, 100, 50,
                         juce::Justification::left,
                         50.0f);
}
```

![drawMultiLineText.png](/images/juce-graphics-draw-examples/drawMultiLineText.png)

### [drawText()](https://docs.juce.com/master/classGraphics.html#a0c3c9a14db0d2c69c43a6c7b225a2b4d)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.setFont (25.0f);
    g.drawText ("Suzuki Kengo",
                getLocalBounds().withSizeKeepingCentre (50, 50),
                juce::Justification::left,
                true);
}
```

![drawText1.png](/images/juce-graphics-draw-examples/drawText1.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.setFont (25.0f);
    g.drawText ("Suzuki Kengo",
                getLocalBounds().withSizeKeepingCentre (50, 100),
                juce::Justification::left,
                false);
}
```

![drawText2.png](/images/juce-graphics-draw-examples/drawText2.png)

### [drawFittedText()](https://docs.juce.com/master/classGraphics.html#a295421ac744e2948a59c760fce420ecb)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.setFont (25.0f);
    g.drawFittedText ("Suzuki Kengo",
                      getLocalBounds().withSizeKeepingCentre (150, 50),
                      juce::Justification::centred,
                      1);
}
```

![drawFittedText1.png](/images/juce-graphics-draw-examples/drawFittedText1.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.setFont (25.0f);
    g.drawFittedText ("Suzuki Kengo",
                      getLocalBounds().withSizeKeepingCentre (80, 50),
                      juce::Justification::centred,
                      2);
}
```

![drawFittedText2.png](/images/juce-graphics-draw-examples/drawFittedText2.png)

### [drawRect()](https://docs.juce.com/master/classGraphics.html#ac2b0082121c4f861822c47c6ffb6a948)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.drawRect (getLocalBounds().withSizeKeepingCentre (300.0f, 100.0f));
}
```

![drawRect.png](/images/juce-graphics-draw-examples/drawRect.png)

### [drawRoundedRectangle()](https://docs.juce.com/master/classGraphics.html#a3a81d9123f61a64776eeccddbba8286f)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.drawRoundedRectangle (getLocalBounds().toFloat().withSizeKeepingCentre (300.0f, 100.0f),
                            50.0f, 2.0f);
}
```

![drawRoundedRectangle.png](/images/juce-graphics-draw-examples/drawRoundedRectangle.png)

### [drawEllipse()](https://docs.juce.com/master/classGraphics.html#a41a775f285e2ce2a5ace3ead44838702)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.drawEllipse (getLocalBounds().toFloat().withSizeKeepingCentre (200.0f, 200.0f),
                   1.5f);
}
```

![drawEllipse.png](/images/juce-graphics-draw-examples/drawEllipse.png)

### [drawLine()](https://docs.juce.com/master/classGraphics.html#acc46510231b725049438d9a4063fa802)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.drawLine (juce::Line<float> (50.0f, 150.0f, 450.0f, 250.0f), 2.0f);
}
```

![drawLine.png](/images/juce-graphics-draw-examples/drawLine.png)

### [drawDashedLine()](https://docs.juce.com/master/classGraphics.html#aa2a0784a933cb3bcc9f92185783cd9c2)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    const float dashLength[] = { 5.0f, 7.0f, 5.0f, 15.0f };
    g.setColour (blue);
    g.drawDashedLine (juce::Line<float> (50.0f, 100.0f, 550.0f, 200.0f),
                      dashLength, 4, 5.0f, 2);
}
```

![drawDashedLine1.png](/images/juce-graphics-draw-examples/drawDashedLine1.png)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    const float dashLength[] = { 5.0f, 20.0f, 5.0f, 50.0f };
    g.setColour (blue);
    g.drawDashedLine (juce::Line<float> (50.0f, 250.0f, 550.0f, 100.0f),
                      dashLength, 4, 5.0f, 0);
}
```

![drawDashedLine2.png](/images/juce-graphics-draw-examples/drawDashedLine2.png)

### [drawVerticalLine()](https://docs.juce.com/master/classGraphics.html#a9e800a2aaa10b3dd0db9aa08a58b0923)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.drawVerticalLine (300, 0.0f, 250.0f);
}
```

![drawVerticalLine.png](/images/juce-graphics-draw-examples/drawVerticalLine.png)

### [drawHorizontalLine()](https://docs.juce.com/master/classGraphics.html#a6625d72cb899b3d213c3bb7a91409ff2)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.drawHorizontalLine (200, 0.0f, 450.0f);
}
```

![drawHorizontalLine.png](/images/juce-graphics-draw-examples/drawHorizontalLine.png)

### [drawArrow()](https://docs.juce.com/master/classGraphics.html#a39f4cdcd741195f708c2f2b7c69196d8)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    g.setColour (blue);
    g.drawArrow (juce::Line<float> (100.0f, 100.0f, 500.0f, 250.0f),
                 2.5f, 50.0f, 50.0f);
}
```

![drawArrow.png](/images/juce-graphics-draw-examples/drawArrow.png)

### [drawImageAt()](https://docs.juce.com/master/classGraphics.html#a229be35e1ac1379530d5c9283932cd2b)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    auto testImage = juce::Image (juce::Image::PixelFormat::ARGB,
                                  200, 200, true);
    juce::Graphics testGraphics (testImage);
    testGraphics.setColour (blue);
    testGraphics.fillRect (testImage.getBounds());

    g.drawImageAt (testImage, 50, 100);
}
```

![drawImageAt.png](/images/juce-graphics-draw-examples/drawImageAt.png)

### [drawImage()](https://docs.juce.com/master/classGraphics.html#aacaf3a0b803211e9332de2070ead1fda)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    auto testImage = juce::Image (juce::Image::PixelFormat::ARGB,
                                  200, 200, true);
    juce::Graphics testGraphics (testImage);
    testGraphics.setColour (blue);
    testGraphics.fillRect (testImage.getBounds());

    g.drawImage (testImage, getLocalBounds().toFloat(),
                 juce::RectanglePlacement::doNotResize);
}
```

![drawImage.png](/images/juce-graphics-draw-examples/drawImage.png)

### [drawImageTransformed()](https://docs.juce.com/master/classGraphics.html#aa738caa959cc0f067eaaebca956a7012)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    auto testImage = juce::Image (juce::Image::PixelFormat::ARGB,
                                  200, 200, true);
    juce::Graphics testGraphics (testImage);
    testGraphics.setColour (blue);
    testGraphics.fillRect (testImage.getBounds());

    g.drawImageTransformed (testImage, juce::AffineTransform::translation (300, 100));
}
```

![drawImageTransformed.png](/images/juce-graphics-draw-examples/drawImageTransformed.png)

### [drawImageWithin()](https://docs.juce.com/master/classGraphics.html#a0e6764c4892e710366369f579c40895b)

```c++
void MainComponent::paint (juce::Graphics& g)
{
    auto black = juce::Colour::fromFloatRGBA (0.08f, 0.08f, 0.08f, 1.0f);
    auto blue  = juce::Colour::fromFloatRGBA (0.43f, 0.83f, 1.0f,  1.0f);

    g.fillAll (black);

    auto testImage = juce::Image (juce::Image::PixelFormat::ARGB,
                                  200, 200, true);
    juce::Graphics testGraphics (testImage);
    testGraphics.setColour (blue);
    testGraphics.fillRect (testImage.getBounds());

    g.drawImageWithin (testImage, 300, 50, 50, 50, juce::RectanglePlacement::stretchToFit);
}
```

![drawImageWithin.png](/images/juce-graphics-draw-examples/drawImageWithin.png)
