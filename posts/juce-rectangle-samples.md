---
title: 'juce::Rectangle'
date: '2021-09-21'
image: 'https://test-kengo-blog.vercel.app/images/juce-rectangle/reduced.png'
---

## set\*

### [setSize()](https://docs.juce.com/master/classRectangle.html#abda6f95da8f85ce896652bd9eacd2183)

```c++
	yellowRect.setSize (100, 200);
```

![setSize()](/images/juce-rectangle/setSize.png)

### [setBounds()](https://docs.juce.com/master/classRectangle.html#a9006d88b3ca06d4da57f9960dbc13ed6)

```c++
	yellowRect.setBounds (90, 100, 100, 100);
```

![setBounds()](/images/juce-rectangle/setBounds.png)

### [setX()](https://docs.juce.com/master/classRectangle.html#ae2781b7d472f7f884589846f25366cfb)

```c++
	yellowRect.setX (50);
```

![setX()](/images/juce-rectangle/setX.png)

### [setY()](https://docs.juce.com/master/classRectangle.html#aee56aca55454ee438f7ceaa7fbce014d)

```c++
	yellowRect.setY (20);
```

![setY()](/images/juce-rectangle/setY.png)

### [setTop()](https://docs.juce.com/master/classRectangle.html#aca3a55b96b0f7a4479bbd99fdfa5f06c)

```c++
	yellowRect.setTop (150);
```

![setTop()](/images/juce-rectangle/setTop.png)

### [setBottom()](https://docs.juce.com/master/classRectangle.html#a6d012ef063e3679e7d1eb5ba0e2e5d6b)

```c++
	yellowRect.setBottom (150);
```

![setBottom()](/images/juce-rectangle/setBottom.png)

### [setLeft()](https://docs.juce.com/master/classRectangle.html#aae36b6ef82255e6f5f75e817de1c57f2)

```c++
	yellowRect.setLeft (150);
```

![setLeft()](/images/juce-rectangle/setLeft.png)

### [setRight()](https://docs.juce.com/master/classRectangle.html#a486d587b371e649db93399e8c673a568)

```c++
	yellowRect.setRight (150);
```

![setRight()](/images/juce-rectangle/setRight.png)

### [setCentre()](https://docs.juce.com/master/classRectangle.html#a495ed32b0a5de81654d25c1f274e5159)

```c++
	yellowRect.setCentre (280, 150);
```

![setCentre()](/images/juce-rectangle/setCentre.png)

### [setHorizontalRange()](https://docs.juce.com/master/classRectangle.html#a711e64d9842cc1fecad266646c27a1e5)

```c++
	yellowRect.setHorizontalRange (juce::Range<int> (40, 200));
```

![setHorizontalRange()](/images/juce-rectangle/setHorizontalRange.png)

### [setVerticalRange()](https://docs.juce.com/master/classRectangle.html#a0d133fb0af2a675fff4f7a4420eaba7c)

```c++
	yellowRect.setVerticalRange (juce::Range<int> (60, 250));
```

![setVerticalRange()](/images/juce-rectangle/setVerticalRange.png)

## reduce/expand

### [reduce()](https://docs.juce.com/master/classRectangle.html#aa1aa5758b0ddcced6954c5f82692ac63)

```c++
	yellowRect.reduce (20, 50);
```

![reduce()](/images/juce-rectangle/reduce.png)

### [expand()](https://docs.juce.com/master/classRectangle.html#a2c16260a8af324607ed81ecf4ec09958)

```c++
	yellowRect.expand (30, 40);
```

![expand()](/images/juce-rectangle/expand.png)

### [reduced()](https://docs.juce.com/master/classRectangle.html#a5623a7886c63a08917b392c7bc1135a9)

```c++
	auto greenRect = blueRect.reduced (50, 30);
```

![reduced()](/images/juce-rectangle/reduced.png)

### [expanded()](https://docs.juce.com/master/classRectangle.html#a36ad43dd58aecee9f6ca3b7060a5d7a8)

```c++
	auto greenRect = blueRect.expanded (50, 30);
```

![expanded()](/images/juce-rectangle/expanded.png)

## with\*

### [withX()](https://docs.juce.com/master/classRectangle.html#ab7cad7c96c191ff4affa28757ae2ade0)

```c++
	auto greenRect = blueRect.withX (20);
```

![withX()](/images/juce-rectangle/withX.png)

### [withY()](https://docs.juce.com/master/classRectangle.html#ab989f8938b2daa529b8e12494114be0a)

```c++
	auto greenRect = blueRect.withY (50);
```

![withY()](/images/juce-rectangle/withY.png)

### [withRightX()](https://docs.juce.com/master/classRectangle.html#a8a5e0f62c0550a19a406c0460f9e5c5b)

```c++
	auto greenRect = blueRect.withRightX (80);
```

![withRightX()](/images/juce-rectangle/withRightX.png)

### [withRight()](https://docs.juce.com/master/classRectangle.html#a65248df3d4e47bc1f76a3677b881da6b)

```c++
	auto greenRect = blueRect.withRight (80);
```

![withRight()](/images/juce-rectangle/withRight.png)

### [withBottomY()](https://docs.juce.com/master/classRectangle.html#ab64c76898f6b47ece254675c075e6450)

```c++
	auto greenRect = blueRect.withBottomY (250);
```

![withBottomY()](/images/juce-rectangle/withBottomY.png)

### [withBottom()](https://docs.juce.com/master/classRectangle.html#ad1afaef68c7e102e68e7aee989893a7d)

```c++
	auto greenRect = blueRect.withBottom (250);
```

![withBottom()](/images/juce-rectangle/withBottom.png)

### [withLeft()](https://docs.juce.com/master/classRectangle.html#aed76e59294bbe5db608d2909db958b82)

```c++
	auto greenRect = blueRect.withLeft (150);
```

![withLeft()](/images/juce-rectangle/withLeft.png)

### [withTop()](https://docs.juce.com/master/classRectangle.html#a83adb415b76c84c38d40d4c0c59199b4)

```c++
	auto greenRect = blueRect.withTop (150);
```

![withTop()](/images/juce-rectangle/withTop.png)

### [withPosition()](https://docs.juce.com/master/classRectangle.html#a01440bb20c425e8be7b58bd60a0c164f)

```c++
	auto greenRect = blueRect.withPosition (100, 100);
```

![withPosition()](/images/juce-rectangle/withPosition.png)

### [withZeroOrigin()](https://docs.juce.com/master/classRectangle.html#a37748fcf8ae61d1aa31ab49aa5cc787c)

```c++
	auto greenRect = blueRect.withZeroOrigin();
```

![withZeroOrigin()](/images/juce-rectangle/withZeroOrigin.png)

### [withCentre()](https://docs.juce.com/master/classRectangle.html#ae62c5d54c86744e1d21b300e70fa3ca4)

```c++
	auto greenRect = blueRect.withCentre (juce::Point<int> (200, 250));
```

![withCentre()](/images/juce-rectangle/withCentre.png)

### [withWidth()](https://docs.juce.com/master/classRectangle.html#aa6535793ce323795d12e8cf25e9cbcc3)

```c++
	auto greenRect = blueRect.withWidth (100);
```

![withWidth()](/images/juce-rectangle/withWidth.png)

### [withHeight()](https://docs.juce.com/master/classRectangle.html#afaefb31c84e0c2ba2e137ef7635442ee)

```c++
	auto greenRect = blueRect.withHeight (100);
```

![withHeight()](/images/juce-rectangle/withHeight.png)

### [withSize()](https://docs.juce.com/master/classRectangle.html#affc948b0f4636455906fa587c7c3fb72)

```c++
	auto greenRect = blueRect.withSize (100, 100);
```

![withSize()](/images/juce-rectangle/withSize.png)

### [withSizeKeepingCentre()](https://docs.juce.com/master/classRectangle.html#ac9df3fd3a8c83b92a1299981025ba225)

```c++
	auto greenRect = blueRect.withSizeKeepingCentre (50, 50);
```

![withSizeKeepingCentre()](/images/juce-rectangle/withSizeKeepingCentre.png)

### [withTrimmedTop()](https://docs.juce.com/master/classRectangle.html#a10a020722da34fcc956c43ced0547cb3)

```c++
	auto greenRect = blueRect.withTrimmedTop (100);
```

![withTrimmedTop()](/images/juce-rectangle/withTrimmedTop.png)

### [withTrimmedBottom()](https://docs.juce.com/master/classRectangle.html#ad60dbbd7e831d7df061eab4a0c802420)

```c++
	auto greenRect = blueRect.withTrimmedBottom (100);
```

![withTrimmedBottom()](/images/juce-rectangle/withTrimmedBottom.png)

### [withTrimmedLeft()](https://docs.juce.com/master/classRectangle.html#afda1d0e4912c63f3b8a28e3c883555af)

```c++
	auto greenRect = blueRect.withTrimmedLeft (100);
```

![withTrimmedLeft()](/images/juce-rectangle/withTrimmedLeft.png)

### [withTrimmedRight()](https://docs.juce.com/master/classRectangle.html#a10cc2940bb2e944551fee774c6326785)

```c++
	auto greenRect = blueRect.withTrimmedRight (100);
```

![withTrimmedRight()](/images/juce-rectangle/withTrimmedRight.png)

## removeFrom\*

### [removeFromTop()](https://docs.juce.com/master/classRectangle.html#a3fbd4e7e1df5336980fb7ec5e752a222)

```c++
	auto greenRect = blueRect.removeFromTop (50);
```

![removeFromTop()](/images/juce-rectangle/removeFromTop.png)

### [removeFromBottom()](https://docs.juce.com/master/classRectangle.html#a6f7d3a88adfc3b3bf699ca4ce5b9e6c0)

```c++
	auto greenRect = blueRect.removeFromBottom (50);
```

![removeFromBottom()](/images/juce-rectangle/removeFromBottom.png)

### [removeFromLeft()](https://docs.juce.com/master/classRectangle.html#a6f09929fd89d447eb230c170446788ac)

```c++
	auto greenRect = blueRect.removeFromLeft (50);
```

![removeFromLeft())](/images/juce-rectangle/removeFromLeft.png)

### [removeFromRight()](https://docs.juce.com/master/classRectangle.html#a67c1ae2bf4753bda71894271dc94b4f6)

```c++
	auto greenRect = blueRect.removeFromRight (50);
```

![removeFromRight()](/images/juce-rectangle/removeFromRight.png)
