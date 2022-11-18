---
title: 'Max/M4Lユーザのためのプラグイン開発入門'
createdDate: '2022-11-19'
updatedDate: '2022-11-19'
thumbnail: '/images/amcj-juce-rnbo/amcj-juce-rnbo.png'
---

![amcj.png](/images/amcj-juce-rnbo/amcj-juce-rnbo.png)

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

## Audio Plugin Export
![plugin-export.png](/images/amcj-juce-rnbo/plugin-export.png)

## rnbo-granular.maxpatの解説
![rnbo-granular.png](/images/amcj-juce-rnbo/rnbo-granular.png)

## Projucerのセットアップ
![projucer-error.png](/images/amcj-juce-rnbo/projucer-error.png)

## JUCE & RNBO 連携手順

### Step1. C++エクスポート
- output directoryはJUCEプロジェクト内のRnboExportディレクトリに指定

### Step2. ProjucerにエクスポートしたC++コードを読み込ませる

### Step3. ParamIDs.hを編集
- RnboExportディレクトリ内のdescription.jsonファイルの中身を確認。
- "visible"がtrueのパラメータ分の定数を作る。
- 定数の値は"paramId"の値と同じにする。

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

### Step2. createParameterLayout内を編集
```C++:PluginProcessor.cpp

```

### step3. ビルド確認



## UI構築手順
### Step1. UIオブジェクト作成
- juce::Slider等の表示させたいオブジェクトを宣言する。
### Step2. addAndMakeVisible
- PluginEditor.cppのコンストラクタ内でaddAndMakeVisible関数を使って、子コンポーネントとして追加＆可視化の設定をする。
### Step3. setBounds
- PluginEditor.cppのresized関数内でsetBounds関数を使い、位置とサイズを与える。
