---
title: 'juce::Rectangle Visualisation'
createdDate: '2021-09-21'
updatedDate: '2022-08-13'
thumbnail: '/images/juce-rectangle/thumbnail.png'
---

## Default Setting

![default-setting.png](/images/juce-rectangle/default-setting.png)

```c++
setSize (400, 400);
blueRect.setBounds   (100, 100, 200, 200);
yellowRect.setBounds (100, 100, 200, 200);
```

```text
              x,   y,   w,   h, centreX, centreY
blackRect:    0,   0, 400, 400,     200,     200
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200, 200,     200,     200
```

## Set\*

### setPosition

![setPosition.png](/images/juce-rectangle/setPosition.png)

```c++
yellowRect.setPosition (50, 40);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  50,  40, 200, 200,     150,     140
```

- [setPosition - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#ae6d4a3356f9a9038d08d68e18927373e)

### setSize

![setSize.png](/images/juce-rectangle/setSize.png)

```c++
yellowRect.setSize (80, 80);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100,  80,  80,     140,     140
```

- [setSize - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#abda6f95da8f85ce896652bd9eacd2183)

### setBounds

![setBounds.png](/images/juce-rectangle/setBounds.png)

```c++
yellowRect.setBounds (70, 180, 280, 60);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  70, 180, 280,  60,     210,     210
```

- [setBounds - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a9006d88b3ca06d4da57f9960dbc13ed6)

### setX

![setX.png](/images/juce-rectangle/setX.png)

```c++
yellowRect.setX (180);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 180, 100, 200, 200,     280,     200
```

- [setX - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#ae2781b7d472f7f884589846f25366cfb)

### setY

![setY.png](/images/juce-rectangle/setY.png)

```c++
yellowRect.setY (40);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100,  40, 200, 200,     200,     140
```

- [setY - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aee56aca55454ee438f7ceaa7fbce014d)

### setWidth

![setWidth.png](/images/juce-rectangle/setWidth.png)

```c++
yellowRect.setWidth (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100,  50, 200,     125,     200
```

- [setWidth - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a8404c4d1ad2060433bffc9b761c6212e)

### setHeight

![setHeight.png](/images/juce-rectangle/setHeight.png)

```c++
yellowRect.setHeight (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200,  50,     200,     125
```

- [setHeight - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a5409ec62e9af9bb374bcfc9cef39941c)

### setCentre

![setCentre.png](/images/juce-rectangle/setCentre.png)

```c++
yellowRect.setCentre (260, 240);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 160, 140, 200, 200,     260,     240
```

- [setCentre - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a495ed32b0a5de81654d25c1f274e5159)

### setHorizontalRange

![setHorizontalRange.png](/images/juce-rectangle/setHorizontalRange.png)

```c++
yellowRect.setHorizontalRange (juce::Range<int> { 20, 380 });
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  20, 100, 360, 200,     200,     200
```

- [setHorizontalRange - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a711e64d9842cc1fecad266646c27a1e5)

### setVerticalRange

![setVerticalRange.png](/images/juce-rectangle/setVerticalRange.png)

```c++
yellowRect.setVerticalRange (juce::Range<int> { 20, 380 });
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100,  20, 200, 360,     200,     200
```

- [setVerticalRange - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a0d133fb0af2a675fff4f7a4420eaba7c)

### setLeft

![setLeft.png](/images/juce-rectangle/setLeft.png)

```c++
yellowRect.setLeft (20);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 20,  100, 280, 200,     160,     200
```

- [setLeft - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aae36b6ef82255e6f5f75e817de1c57f2)

### setTop

![setTop.png](/images/juce-rectangle/setTop.png)

```c++
yellowRect.setTop (20);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100,  20, 200, 280,     200,     160
```

- [setTop - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aca3a55b96b0f7a4479bbd99fdfa5f06c)

### setRight

![setRight.png](/images/juce-rectangle/setRight.png)

```c++
yellowRect.setRight (180);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100,  80, 200,     140,     200
```

- [setRight - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a486d587b371e649db93399e8c673a568)

### setBottom

![setBottom.png](/images/juce-rectangle/setBottom.png)

```c++
yellowRect.setBottom (180);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200,  80,     200,     140
```

- [setBottom - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a6d012ef063e3679e7d1eb5ba0e2e5d6b)

## With\*

### withX

![withX.png](/images/juce-rectangle/withX.png)

```c++
yellowRect = blueRect.withX (190);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 190, 100, 200, 200,     290,     200
```

- [withX - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a5657125560d85e3b9753a052e2b65f00)

### withY

![withY.png](/images/juce-rectangle/withY.png)

```c++
yellowRect = blueRect.withY (190);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 190, 200, 200,     200,     290
```

- [withY - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a874cbea9c6dad14806aaa1c024ea4d55)

### withRightX

![withRightX.png](/images/juce-rectangle/withRightX.png)

```c++
yellowRect = blueRect.withRightX (400);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 200, 100, 200, 200,     300,     200
```

- [withRightX- JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a7c90542d3b67752e46b7a208b561bf7a)

### withBottomY

![withBottomY.png](/images/juce-rectangle/withBottomY.png)

```c++
yellowRect = blueRect.withBottomY (400);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 200, 200, 200,     200,     300
```

- [withBottomY - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aba7c2f314fda0920eb3c967fe641bd96)

### withPosition

![withPosition.png](/images/juce-rectangle/withPosition.png)

```c++
yellowRect = blueRect.withPosition (40, 40);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  40,  40, 200, 200,     140,     140
```

- [withPosition - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#ae7b95ec59434dfaec98d39670b17a2bb)

### withZeroOrigin

![withZeroOrigin.png](/images/juce-rectangle/withZeroOrigin.png)

```c++
yellowRect = blueRect.withZeroOrigin();
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:   0,   0, 200, 200,     100,     100
```

- [withZeroOrigin - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a0140ec1d4d4f5d176745ab4c30bb03a7)

### withCentre

![withCentre.png](/images/juce-rectangle/withCentre.png)

```c++
yellowRect = blueRect.withCentre (juce::Point<int> { 250, 150 });
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150,  50, 200, 200,     250,     150
```

- [withCentre - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a5e7be2375eb80e0cced2e3039fbbfc71)

### withWidth

![withWidth.png](/images/juce-rectangle/withWidth.png)

```c++
yellowRect = blueRect.withWidth (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100,  50, 200,     125,     200
```

- [withWidth - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a2012c73045695d58a2a9878e7e047c4f)

### withHeight

![withHeight.png](/images/juce-rectangle/withHeight.png)

```c++
yellowRect = blueRect.withHeight (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200,  50,     200,     125
```

- [withHeight - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a70f70ba7f3e16f179dcf469321fec917)

### withSize

![withSize.png](/images/juce-rectangle/withSize.png)

```c++
yellowRect = blueRect.withSize (50, 250);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100,  50, 250,     125,     225
```

- [withSize - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#ac438c0d3e4e4840e89dca6d01d08552c)

### withSizeKeepingCentre

![withSizeKeepingCentre.png](/images/juce-rectangle/withSizeKeepingCentre.png)

```c++
yellowRect = blueRect.withSizeKeepingCentre (50, 50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 175, 175,  50,  50,     200,     200
```

- [withSizeKeepingCentre - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aa920fc26e206a3854db09c980b5a1746)

### withLeft

![withLeft.png](/images/juce-rectangle/withLeft.png)

```c++
yellowRect = blueRect.withLeft (20);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  20, 100, 280, 200,     160,     200
```

- [withLeft - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aa60562d5b6e8b0f3384da973cef897fc)

### withTop

![withTop.png](/images/juce-rectangle/withTop.png)

```c++
yellowRect = blueRect.withTop (20);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 20,  200, 280,     200,     160
```

- [withTop - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a6ea52d7f3a514f6017279d0a341a4802)

### withRight

![withRight.png](/images/juce-rectangle/withRight.png)

```c++
yellowRect = blueRect.withRight (220);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 120, 200,     160,     200
```

- [withRight - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a21df7ed25d610b205e3b877f05260a86)

### withBottom

![withBottom.png](/images/juce-rectangle/withBottom.png)

```c++
yellowRect = blueRect.withBottom (220);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200, 120,     200,     160
```

- [withBottom - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#adfdea20cc8f60a794c0b26c21f076eae)

### withTrimmedLeft

![withTrimmedLeft.png](/images/juce-rectangle/withTrimmedLeft.png)

```c++
yellowRect = blueRect.withTrimmedLeft (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150, 100, 150, 200,     225,     200
```

- [withTrimmedLeft - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a4e2fadb7fddb433ba0d779cb4f5505f2)

### withTrimmedRight

![withTrimmedRight.png](/images/juce-rectangle/withTrimmedRight.png)

```c++
yellowRect = blueRect.withTrimmedRight (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 150, 200,     175,     200
```

- [withTrimmedRight - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a080436930d30acad95f75c887953ea1b)

### withTrimmedTop

![withTrimmedTop.png](/images/juce-rectangle/withTrimmedTop.png)

```c++
yellowRect = blueRect.withTrimmedTop (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 150, 200, 150,     200,     225
```

- [withTrimmedTop - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#ae3c0327b819c25ef2fc27e8858ee680a)

### withTrimmedBottom

![withTrimmedBottom.png](/images/juce-rectangle/withTrimmedBottom.png)

```c++
yellowRect = blueRect.withTrimmedBottom (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200, 150,     200,     175
```

- [withTrimmedBottom - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a451c559968c4998f3df2cd14634d2a54)

## Operators

### operator+

![operator+.png](/images/juce-rectangle/operator+.png)

```c++
yellowRect = blueRect + juce::Point<int> { 50, 50 };
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150, 150, 200, 200,     250,     250
```

- [operator+ - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a030cf838ccbc6a1b0b44bd127eabdf8d)

### operator+=

![operator+=.png](/images/juce-rectangle/operator+.png)

```c++
yellowRect += juce::Point<int> { 50, 50 };
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150, 150, 200, 200,     250,     250
```

- [operator+= - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a2995928f1977e11e69cbad6b7eab610d)

### operator-

![operator-.png](/images/juce-rectangle/operator-.png)

```c++
yellowRect = blueRect - juce::Point<int> { 50, 50 };
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  50,  50, 200, 200,     150,     150
```

- [operator- - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a11a2bb1c04b8f0ae9bb76d21dc3fc289)

### operator-=

![operator-=.png](/images/juce-rectangle/operator-.png)

```c++
yellowRect -= juce::Point<int> { 50, 50 };
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  50,  50, 200, 200,     150,     150
```

- [operator-= - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#abddeb1fa13351683312224b5a05e4bff)

### operator\*

![operator*.png](/images/juce-rectangle/operator*.png)

```c++
yellowRect = blueRect * 0.5f;
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  50,  50, 100, 100,     100,     100
```

- [operator\* - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a768376e996b91ecb83d5ec7f0db2d50c)

### operator\*=

![operator*=.png](/images/juce-rectangle/operator*.png)

```c++
yellowRect *= 0.5f;
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  50,  50, 100, 100,     100,     100
```

- [operator\*= - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#acec9ecfe72bc29922e82e21e513a93ed)

### operator/

![operator:.png](/images/juce-rectangle/operator:.png)

```c++
yellowRect = blueRect / 4.0f;
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  25,  25,  50,  50,      50,      50
```

- [operator/ - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a31c2880e4d60ddb1a1d584585504d455)

### operator/=

![operator:.png](/images/juce-rectangle/operator:.png)

```c++
yellowRect /= 4.0f;
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  25,  25,  50,  50,      50,      50
```

- [operator/= - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#ae01803333e37bbc2a49f97f1f720b373)

## Others

### translate

![translate.png](/images/juce-rectangle/translate.png)

```c++
yellowRect.translate (50, 50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150, 150, 200, 200,     250,     250
```

- [translate - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aa13dfd466078c2710fdea6ff2f7b263b)

### translated

![translated.png](/images/juce-rectangle/translate.png)

```c++
yellowRect = blueRect.translated (50, 50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150, 150, 200, 200,     250,     250
```

- [translated - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a15c8a44d4b194032bb072869a7161eef)

### expand

![expand.png](/images/juce-rectangle/expand.png)

```c++
yellowRect.expand (20, 50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  80,  50, 240, 300,     200,     200
```

- [expand - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a2c16260a8af324607ed81ecf4ec09958)

### expanded

![expanded.png](/images/juce-rectangle/expand.png)

```c++
yellowRect = blueRect.expanded (20, 50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  80,  50, 240, 300,     200,     200
```

- [expanded - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a36ad43dd58aecee9f6ca3b7060a5d7a8)

### reduce

![reduce.png](/images/juce-rectangle/reduce.png)

```c++
yellowRect.reduce (20, 50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 120, 150, 160, 100,     200,     200
```

- [reduce - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#aa1aa5758b0ddcced6954c5f82692ac63)

### reduced

![reduced.png](/images/juce-rectangle/reduce.png)

```c++
yellowRect = blueRect.reduced (20, 50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 120, 150, 160, 100,     200,     200
```

- [reduced - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a5623a7886c63a08917b392c7bc1135a9)

### removeFromTop

![removeFromTop.png](/images/juce-rectangle/removeFromTop.png)

```c++
auto whiteRect = yellowRect.removeFromTop (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 150, 200, 150,     200,     225
whiteRect:  100, 100, 200,  50,     200,     125
```

- [removeFromTop - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a3fbd4e7e1df5336980fb7ec5e752a222)

### removeFromLeft

![removeFromLeft.png](/images/juce-rectangle/removeFromLeft.png)

```c++
auto whiteRect = yellowRect.removeFromLeft (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150, 100, 150, 200,     225,     200
whiteRect:  100, 100,  50, 200,     125,     200
```

- [removeFromLeft - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a6f09929fd89d447eb230c170446788ac)

### removeFromRight

![removeFromRight.png](/images/juce-rectangle/removeFromRight.png)

```c++
auto whiteRect = yellowRect.removeFromRight (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 150, 200,     175,     200
whiteRect:  250, 100,  50, 200,     275,     200
```

- [removeFromRight - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a67c1ae2bf4753bda71894271dc94b4f6)

### removeFromBottom

![removeFromBottom.png](/images/juce-rectangle/removeFromBottom.png)

```c++
auto whiteRect = yellowRect.removeFromBottom (50);
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200, 150,     200,     175
whiteRect:  100, 250, 200,  50,     200,     275
```

- [removeFromBottom - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a6f7d3a88adfc3b3bf699ca4ce5b9e6c0)

### getProportion

![getProportion.png](/images/juce-rectangle/getProportion.png)

```c++
yellowRect = blueRect.getProportion (juce::Rectangle<float> { 0.25f, 0.25f, 0.5f, 0.5f });
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 150, 150, 100, 100,     200,     200
```

- [getProportion - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a3676ad7ea0695ebe2707ca548c65702a)

### getIntersection

![getIntersection.png](/images/juce-rectangle/getIntersection.png)

```c++
yellowRect = blueRect.getIntersection (juce::Rectangle<int> { 400, 200 });
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 100, 100, 200, 100,     200,     150
```

- [getIntersection - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a50e80bae322913e844bc628a99fa3166)

### getUnion

![getUnion.png](/images/juce-rectangle/getUnion.png)

```c++
yellowRect = blueRect.getUnion (juce::Rectangle<int> { 10, 10, 10, 10 });
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  10,  10, 290, 290,     155,     155
```

- [getUnion - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a26d128bf3cf8dd1a50afcf946cbc5521)

### constrainedWithin

![constrainedWithin.png](/images/juce-rectangle/constrainedWithin.png)

```c++
yellowRect = blueRect.constrainedWithin (juce::Rectangle<int> { 220, 220, 50, 50 });
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect: 220,  220, 50,  50,     245,     245
```

- [constrainedWithin - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#a5dae3865af00a4264f7f26ea4eeecf98)

### transformedBy

![transformedBy.png](/images/juce-rectangle/transformedBy.png)

```c++
yellowRect = blueRect.transformedBy (juce::AffineTransform::scale (0.75f));
```

```text
              x,   y,   w,   h, centreX, centreY
blueRect:   100, 100, 200, 200,     200,     200
yellowRect:  75,  75, 150, 150,     150,     150
```

- [transformedBy - JUCE: Rectangle< ValueType > Class Template Reference](https://docs.juce.com/master/classRectangle.html#ab103d804bdf15b7ac1381dc79d6742b9)
