---
title: 'Max/M4Lユーザのためのプラグイン開発入門 - AMCJ #32'
createdDate: '2022-11-19'
updatedDate: '2022-11-19'
thumbnail: '/images/amcj-juce-rnbo/amcj-juce-rnbo.png'
---

![amcj.png](/images/amcj-juce-rnbo/amcj-juce-rnbo.png)

[AMCJ #32](https://amcj-032.peatix.com/)にて使用した資料です。アーカイブ期限12/4まで公開します。

## 自己紹介
![stranular.png](/images/amcj-juce-rnbo/stranular.png)
![helisert.png](/images/amcj-juce-rnbo/helisert.png)
![particle-reverb.png](/images/amcj-juce-rnbo/particle-reverb.png)

## 本日の流れ
- 本日作成するものについて
- RNBO C++エクスポート方法
- RNBO C++コードをJUCEプロジェクトに取り込み、連携させる方法
- 基本的なJUCE UIの構築方法
- JUCE UIのカスタマイズ方法

## Audio Plugin Exportとの比較
![plugin-export.png](/images/amcj-juce-rnbo/plugin-export.png)

## 公式の連携方法
- [Cycling74/rnbo-adc-workshop](https://github.com/Cycling74/rnbo-adc-workshop)

## rnbo-granular.maxpat
![rnbo-granular.png](/images/amcj-juce-rnbo/rnbo-granular.png)

## Projucerのセットアップ
![projucer-error.png](/images/amcj-juce-rnbo/projucer-error.png)

## JUCE & RNBO 連携手順
### JuceRnboTemplate.jucerを開く
![projucer.png](/images/amcj-juce-rnbo/projucer.png)

- 注意: Synthプラグインを作る場合は、プロジェクト設定画面のPlugin Characteristics欄に行き、下記三つの項目にチェックを入れる
  - Plugin is a Synth
  - Plugin MIDI Input
  - Plugin MIDI Output

![synth-setting](/images/amcj-juce-rnbo/synth-setting.png)

### C++エクスポート
- output directoryはJUCEプロジェクト内のRnboExportディレクトリに指定
- Export NameとClassnameはお好みで

![cpp-export.png](/images/amcj-juce-rnbo/cpp-export.png)

### ProjucerにエクスポートしたC++コードを読み込ませる

- RnboExportディレクトリをProjucerにドラッグ&ドロップ(Sourceディレクトリ内にドラッグしないように注意)
![include.png](/images/amcj-juce-rnbo/include.png)

### 必要なファイルのみCompileフラグをオン
- 一度RnboExportディレクトリ内の全てのファイルのコンパイルフラグをOFF
![disable-all.png](/images/amcj-juce-rnbo/disable-all.png)

- RnboExportディレクトリ直下にあるcppファイル(今回はrnbo-granular.cpp)のコンパイルフラグをON
![rnbo-granular-cpp.png](/images/amcj-juce-rnbo/rnbo-granular-cpp.png)

- rnboディレクトリ直下にあるRNBO.cppファイルのコンパイルフラグをON
![RNBO-cpp.png](/images/amcj-juce-rnbo/RNBO-cpp.png)

### IDEを開く
- Projucerの右上にある"Save and Open in IDE"ボタンをクリックしてIDEを開く。
- macだとXcode、windowsだとVisual Sudioが開く。
![open-ide.png](/images/amcj-juce-rnbo/open-ide.png)

### ParamIDs.hを編集
- RnboExportディレクトリ内のdescription.jsonファイル開き、"visible"の値がtrueであるパラメータの"paramId"の値を確認する。
![rnbo-description.png](/images/amcj-juce-rnbo/rnbo-description.png)

- この値を使ってParamIDs.hで定数を作る。
- 全てのパラメータ分作る。

```C++:ParamIDs.h
#pragma once

namespace ParamIDs
{

    inline constexpr auto mix      { "mix"       };
    inline constexpr auto gain     { "gain"      };
    inline constexpr auto pos      { "grainPos"  };
    inline constexpr auto size     { "grainSize" };
    inline constexpr auto interval { "interval"  };
    inline constexpr auto pitch    { "pitch"     };
    inline constexpr auto width    { "width"     };

} // namespace paramIDs
```

### createParameterLayout内を編集
- PluginProcessor.cppのcreateParameterLayout関数内で、JUCE側のオーディオパラメータを作成する。

```C++:PluginProcessor.cpp
static juce::AudioProcessorValueTreeState::ParameterLayout createParameterLayout()
{
    juce::AudioProcessorValueTreeState::ParameterLayout layout;

    auto msFormat = [](float value, int)
    {
        if (value < 100.0f)
            return juce::String (value, 1) + " ms";
        else
            return juce::String (std::roundf (value)) + " ms";
    };

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::interval, 1 },
                                                             ParamIDs::interval,
                                                             juce::NormalisableRange<float> (10.0f, 500.0f, 0.01f, 0.405f),
                                                             100.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             msFormat,
                                                             nullptr));
// 省略....

    return layout;
}
```

### ビルド確認
- Standaloneをビルドして起動確認

![generic-editor.png](/images/amcj-juce-rnbo/genericeditor.png)

- ParamIDs.h内の定数の値が間違っていると、下記のようなエラーになる。
description.jsonファイルに記載されている"paramId"の値を確認して、ParamIDs.h内の間違っている定数を修正。
![missing-paramid.png](/images/amcj-juce-rnbo/missing-paramid.png)

- JUCE側のパラメータの範囲が間違っていると、下記のようなエラーになる。
description.jsonファイルに記載されている"minimum", "maximum"の値を確認して、createParameterLayout関数内のJUCEパラメータの範囲を修正。
![incorrect-range.png](/images/amcj-juce-rnbo/incorrect-range.png)

## RNBO Guitar Pedalsでエクスポート練習

![rnbo-guitar-pedals.png](/images/amcj-juce-rnbo/rnbo-guitar-pedals.png)
![chorus.png](/images/amcj-juce-rnbo/chorus.png)
![chorus-export.png](/images/amcj-juce-rnbo/chorus-export.png)
![disable-all-chorus.png](/images/amcj-juce-rnbo/disable-all-chorus.png)
![rnbo-chorus-cpp.png](/images/amcj-juce-rnbo/rnbo-chorus-cpp.png)
![rnbo-prac.png](/images/amcj-juce-rnbo/rnbo-prac.png)

```C++:ParamIDs.h
namespace ParamIDs
{

    inline constexpr auto rate   { "rate"   };
    inline constexpr auto depth  { "depth"  };
    inline constexpr auto spread { "spread" };

//    inline constexpr auto mix       { "mix"       };
//    inline constexpr auto gain      { "gain"      };
// 省略....

} // namespace ParamIDs
```

```C++:PluginProcessor.cpp
static juce::AudioProcessorValueTreeState::ParameterLayout createParameterLayout()
{
    juce::AudioProcessorValueTreeState::ParameterLayout layout;
    
    auto percentFormat = [](float value, int)
    {
         if (value < 10.0f)
             return juce::String (value, 2) + " %";
         else if (value < 100.0f)
             return juce::String (value, 1) + " %";
         else
             return juce::String (value, 0) + " %";
    };

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::rate, 1 },
                                                             ParamIDs::rate,
                                                             juce::NormalisableRange<float> (0.0f, 100.0f, 0.01f, 1.0f),
                                                             50.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             percentFormat,
                                                             nullptr));
// 省略....

    return layout;
}

```

![chorus-standalone.png](/images/amcj-juce-rnbo/chorus-standalone.png)
![chorus-vst.png](/images/amcj-juce-rnbo/chorus-vst.png)

## UI構築手順
### GenericAudioProcessorEditorをOFF
- GenericAudioProcessorEditorの方をコメントアウトし、JuceRnboTemplateAudioProcessorEditorの方をコメント解除する。

```C++:PluginEditor.cpp
juce::AudioProcessorEditor* JuceRnboTemplateAudioProcessor::createEditor()
{
    return new JuceRnboTemplateAudioProcessorEditor (*this, apvts);
//    return new juce::GenericAudioProcessorEditor (*this);
}
```

![editor.png](/images/amcj-juce-rnbo/editor.png)

### JUCEのUIオブジェクトを作る
- juce::Slider等の表示させたいオブジェクトを宣言する。

```C++:PluginEditor.h
class JuceRnboTemplateAudioProcessorEditor  : public juce::AudioProcessorEditor
{
// 省略....
private:
    JuceRnboTemplateAudioProcessor& audioProcessor;
    
    juce::Slider intervalSlider; // 追加
    
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (JuceRnboTemplateAudioProcessorEditor)
};
```

### addAndMakeVisible
- PluginEditor.cppのコンストラクタ内でaddAndMakeVisible関数を使って、子コンポーネントとして追加＆可視化の設定をする。

```C++:PluginEditor.cpp
JuceRnboTemplateAudioProcessorEditor::JuceRnboTemplateAudioProcessorEditor (JuceRnboTemplateAudioProcessor& p,
                                                                              juce::AudioProcessorValueTreeState& apvts)
    : AudioProcessorEditor (&p), audioProcessor (p)
{
    setSize (400, 300);
    
    addAndMakeVisible (intervalSlider); // 追加
}
```

### setBounds
- PluginEditor.cppのresized関数内でsetBounds関数を使い、位置とサイズを与える。

```C++:PluginEditor.cpp
void JuceRnboTemplateAudioProcessorEditor::resized()
{
    intervalSlider.setBounds (50, 50, 250, 60);
}
```

### ビルド
- Standaloneをビルドしてrun。

![create-slider.png](/images/amcj-juce-rnbo/create-slider.png)

## UI/DSP連携手順
### Attachment系オブジェクトを作る
- AudioParameterFloat型のオーディオパラメータとSliderを連携させたい時
    - [SliderParameterAttachment](https://docs.juce.com/master/classSliderParameterAttachment.html)
    - [SliderAttachment](https://docs.juce.com/master/classAudioProcessorValueTreeState_1_1SliderAttachment.html)
- AudioParameterBool型のオーディオパラメータとButtonを連携させたい時
    - [ButtonParameterAttachment](https://docs.juce.com/master/classButtonParameterAttachment.html)
    - [ButtonAttachment](https://docs.juce.com/master/classAudioProcessorValueTreeState_1_1ButtonAttachment.html)
- AudioParameterChoice型のオーディオパラメータとComboBoxを連携させたい時
    - [ComboBoxParameterAttachment](https://docs.juce.com/master/classComboBoxParameterAttachment.html)
    - [ComboBoxAttachment](https://docs.juce.com/master/classAudioProcessorValueTreeState_1_1ComboBoxAttachment.html)

```C++:PluginEditor.h
class JuceRnboTemplateAudioProcessorEditor  : public juce::AudioProcessorEditor
{
// 省略....
private:
    JuceRnboTemplateAudioProcessor& audioProcessor;
    
    juce::Slider intervalSlider;
    
    juce::SliderParameterAttachment intervalAttachment; // 追加

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (JuceRnboTemplateAudioProcessorEditor)
};

```

### ParamIDs.hファイルをインクルード
- ParamIDsを使用するため、PluginEditor.cppの上部でインクルード

```C++:PluginEditor.cpp
#include "PluginProcessor.h"
#include "PluginEditor.h"
#include "ParamIDs.h" // 追加
```

### Attachment系オブジェクトの初期化
- 連携させたいオーディオパラメータとUIオブジェクトを引数に渡す。

```C++:PluginEditor.cpp
JuceRnboTemplateAudioProcessorEditor::JuceRnboTemplateAudioProcessorEditor (JuceRnboTemplateAudioProcessor& p,
                                                                            juce::AudioProcessorValueTreeState& apvts)
    : AudioProcessorEditor (&p), audioProcessor (p), // カンマを追加して改行
      intervalAttachment (*apvts.getParameter (ParamIDs::interval), intervalSlider) // 追加
{
// 省略....
}
```

### ビルド
- Standaloneをビルドしてrun。

![attachment.png](/images/amcj-juce-rnbo/attachment.png)

## カスタマイズUI (メンバ関数)
### Sliderの色を変える

```C++:PluginEditor.cpp
JuceRnboTemplateAudioProcessorEditor::JuceRnboTemplateAudioProcessorEditor (JuceRnboTemplateAudioProcessor& p,
                                                                              juce::AudioProcessorValueTreeState& apvts)
    : AudioProcessorEditor (&p), audioProcessor (p),
      intervalAttachment (*apvts.getParameter (ParamIDs::interval), intervalSlider)
{
    setSize (400, 300);
    
    intervalSlider.setColour (juce::Slider::trackColourId,      juce::Colours::white); // 追加
    intervalSlider.setColour (juce::Slider::backgroundColourId, juce::Colours::darkgrey); // 追加

    addAndMakeVisible (intervalSlider);
}
```

![slider-colour.png](/images/amcj-juce-rnbo/slider-colour.png)

### Sliderのスタイルを変える

```C++:PluginEditor.cpp
JuceRnboTemplateAudioProcessorEditor::JuceRnboTemplateAudioProcessorEditor (JuceRnboTemplateAudioProcessor& p,
                                                                              juce::AudioProcessorValueTreeState& apvts)
    : AudioProcessorEditor (&p), audioProcessor (p),
      intervalAttachment (*apvts.getParameter (ParamIDs::interval), intervalSlider)
{
    setSize (400, 300);
    
//    intervalSlider.setColour (juce::Slider::trackColourId,      juce::Colours::white);
//    intervalSlider.setColour (juce::Slider::backgroundColourId, juce::Colours::darkgrey);

    intervalSlider.setColour (juce::Slider::rotarySliderFillColourId,    juce::Colours::white); // 追加
    intervalSlider.setColour (juce::Slider::rotarySliderOutlineColourId, juce::Colours::darkgrey); // 追加
    intervalSlider.setSliderStyle (juce::Slider::RotaryVerticalDrag); // 追加

    addAndMakeVisible (intervalSlider);
}
```

```C++:PluginEditor.cpp
void JuceRnboTemplateAudioProcessorEditor::resized()
{
    intervalSlider.setBounds (50, 50, 250, 100);
}
```

![slider-style.png](/images/amcj-juce-rnbo/slider-style.png)

### SliderのTextBoxの位置を変える

```C++:PluginEditor.cpp
JuceRnboTemplateAudioProcessorEditor::JuceRnboTemplateAudioProcessorEditor (JuceRnboTemplateAudioProcessor& p,
                                                                              juce::AudioProcessorValueTreeState& apvts)
    : AudioProcessorEditor (&p), audioProcessor (p),
      intervalAttachment (*apvts.getParameter (ParamIDs::interval), intervalSlider)
{
    setSize (400, 300);
    
//    intervalSlider.setColour (juce::Slider::trackColourId,      juce::Colours::white);
//    intervalSlider.setColour (juce::Slider::backgroundColourId, juce::Colours::darkgrey);

    intervalSlider.setColour (juce::Slider::rotarySliderFillColourId,    juce::Colours::white); // 追加
    intervalSlider.setColour (juce::Slider::rotarySliderOutlineColourId, juce::Colours::darkgrey); // 追加
    intervalSlider.setSliderStyle (juce::Slider::RotaryVerticalDrag); // 追加
    intervalSlider.setTextBoxStyle (juce::Slider::TextBoxBelow, true, 80, 20); // 追加

    addAndMakeVisible (intervalSlider);
}
```

```C++:PluginEditor.cpp
void JuceRnboTemplateAudioProcessorEditor::resized()
{
    intervalSlider.setBounds (50, 50, 100, 120);
}
```

![textbox-tyle.png](/images/amcj-juce-rnbo/textbox-style.png)

## カスタマイズUI (LookAndFeel)
以降解説するファイルは、配布した資料の中のCustomUIsディレクトリ内にある。
今使用しているJUCEプロジェクトのSourceディレクトリ内にコピペし、コピペしたものをProjucerのSourceディレクトリ内にドラッグ&ドロップ。

### 自分専用の色を作れる

```C++:MyColours.h
#pragma once
#include <JuceHeader.h>

namespace MyColours
{

    const juce::Colour blue      { 0xff6dd4ff };
    const juce::Colour grey      { 0xffa0a0a0 };
    const juce::Colour midGrey   { 0xff666666 };
    const juce::Colour blackGrey { 0xff353535 };
    const juce::Colour black     { 0xff141414 };

} // namespace MyColours
```

### カスタムLookAndFeelクラスを作る

```C++:CustomLnf.h
#pragma once

#include <JuceHeader.h>

class CustomLnf  : public juce::LookAndFeel_V4
{
public:
    CustomLnf(){};
    
    void drawRotarySlider (juce::Graphics&, int x, int y, int width, int height,
                           float sliderPosProportional, float rotaryStartAngle,
                           float rotaryEndAngle, juce::Slider&) override;
    
    juce::Font getLabelFont (juce::Label& label) override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (CustomLnf)
};
```
```C++:CustomLnf.cpp
#include <JuceHeader.h>
#include "CustomLnf.h"
#include "MyColours.h"

//==============================================================================
void CustomLnf::drawRotarySlider (juce::Graphics& g, int x, int y, int width, int height, float sliderPos,
                                   const float rotaryStartAngle, const float rotaryEndAngle, juce::Slider& slider)
{
    const auto dialBounds = juce::Rectangle<int> (x, y + 2, width, height).toFloat().reduced (4);
    const auto arcRadius  = juce::jmin (dialBounds.getWidth(), dialBounds.getHeight()) / 2.0f;
    const auto toAngle    = rotaryStartAngle + sliderPos * (rotaryEndAngle - rotaryStartAngle);
    const auto centre     = dialBounds.getCentre();

    juce::Path backgroundArc;
    backgroundArc.addCentredArc (centre.x,
                                 centre.y,
                                 arcRadius,
                                 arcRadius,
                                 0.0f,
                                 toAngle,
                                 rotaryEndAngle,
                                 true);

    const auto lineWidth = arcRadius * 0.1f;
    auto strokeType = juce::PathStrokeType { lineWidth };
    g.setColour (slider.findColour (juce::Slider::rotarySliderOutlineColourId));
    g.strokePath (backgroundArc, strokeType);

    juce::Path valueArc;
    valueArc.addCentredArc (centre.x,
                            centre.y,
                            arcRadius,
                            arcRadius,
                            0.0f,
                            rotaryStartAngle,
                            toAngle,
                            true);

    g.setColour (slider.findColour (juce::Slider::rotarySliderFillColourId));
    g.strokePath (valueArc, strokeType);

    juce::Path needle;
    needle.startNewSubPath (centre);
    needle.lineTo (centre.x, centre.y - arcRadius);
    const auto needleWidth = lineWidth * 1.5f;
    auto needleStorkeType  = juce::PathStrokeType { needleWidth };
    needleStorkeType.setEndStyle (juce::PathStrokeType::rounded);
    g.setColour (slider.findColour (juce::Slider::thumbColourId));
    g.strokePath (needle, needleStorkeType, juce::AffineTransform::rotation (toAngle, centre.x, centre.y));
}

juce::Font CustomLnf::getLabelFont (juce::Label& label)
{
    label.setFont (label.getHeight() * 0.9f);
    return label.getFont();
}
```

### カスタムLookAndFeelオブジェクトを作る

- カスタムLookAndFeelのヘッダをインクルード

```C++:PluginEditor.h
#include <JuceHeader.h>
#include "PluginProcessor.h"
#include "CustomLnf.h" // 追加
```

- カスタムLookAndFeelオブジェクトを宣言

```C++:PluginEditor.h
class JuceRnboTemplateAudioProcessorEditor  : public juce::AudioProcessorEditor
{
// 省略....
private:
    JuceRnboTemplateAudioProcessor& audioProcessor;
    
    CustomLnf customLnf; // 追加
    
    juce::Slider intervalSlider;
    
    juce::SliderParameterAttachment intervalAttachment;
    
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (JuceRnboTemplateAudioProcessorEditor)
};
```

### setLookAndFeelでカスタムLookAndFeelを適用

- コンストラクタ内でsetLookAndFeel関数にカスタムLookAndFeelオブジェクトのアドレスを渡す。

```C++:PluginEditor.cpp
JuceRnboTemplateAudioProcessorEditor::JuceRnboTemplateAudioProcessorEditor (JuceRnboTemplateAudioProcessor& p,
                                                                              juce::AudioProcessorValueTreeState& apvts)
    : AudioProcessorEditor (&p), audioProcessor (p),
      intervalAttachment (*apvts.getParameter (ParamIDs::interval), intervalSlider)
{
    setSize (400, 300);

    setLookAndFeel (&customLnf); // 追加

//    intervalSlider.setColour (juce::Slider::trackColourId,      juce::Colours::white);
//    intervalSlider.setColour (juce::Slider::backgroundColourId, juce::Colours::darkgrey);
    intervalSlider.setColour (juce::Slider::rotarySliderFillColourId,    juce::Colours::white);
    intervalSlider.setColour (juce::Slider::rotarySliderOutlineColourId, juce::Colours::darkgrey);
    intervalSlider.setSliderStyle (juce::Slider::RotaryVerticalDrag);
    intervalSlider.setTextBoxStyle (juce::Slider::TextBoxBelow, true, 80, 20);

    addAndMakeVisible (intervalSlider);
}
```

- デストラクタでカスタムLookAndFeelを解除
```
JuceRnboTemplateAudioProcessorEditor::~JuceRnboTemplateAudioProcessorEditor()
{
    setLookAndFeel (nullptr);
}
```

![customLnf.png](/images/amcj-juce-rnbo/customLnf.png)

### カスタムカラーを使ってみる

```C++:PluginEditor.cpp
JuceRnboTemplateAudioProcessorEditor::JuceRnboTemplateAudioProcessorEditor (JuceRnboTemplateAudioProcessor& p,
                                                                              juce::AudioProcessorValueTreeState& apvts)
    : AudioProcessorEditor (&p), audioProcessor (p),
      intervalAttachment (*apvts.getParameter (ParamIDs::interval), intervalSlider)
{
    setSize (400, 300);
    
    setLookAndFeel (&customLnf);
    
//    intervalSlider.setColour (juce::Slider::trackColourId,      juce::Colours::white);
//    intervalSlider.setColour (juce::Slider::backgroundColourId, juce::Colours::darkgrey);
    intervalSlider.setColour (juce::Slider::thumbColourId,               MyColours::midGrey); // 追加
    intervalSlider.setColour (juce::Slider::rotarySliderFillColourId,    MyColours::blue); // 編集
    intervalSlider.setColour (juce::Slider::rotarySliderOutlineColourId, MyColours::blackGrey); // 編集
    intervalSlider.setSliderStyle (juce::Slider::RotaryVerticalDrag);
    intervalSlider.setTextBoxStyle (juce::Slider::TextBoxBelow, true, 80, 20);

    addAndMakeVisible (intervalSlider);
}
```

![custom-colour.png](/images/amcj-juce-rnbo/custom-colour.png)

## CMakeでやりたい方
- [szkkng/jr-granular](https://github.com/szkkng/jr-granular)
- [JR-Granular - jUCE & RNBO C++ Export](https://kengo.dev/posts/jr-granular)
