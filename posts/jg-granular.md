---
title: 'JG-Granular - JUCE × gen~'
date: '2021-12-16'
thumbnail: '/images/jg-granular/jg-granular.png'
---

## Introduction

![jg-granular.png](/images/jg-granular/jg-granular.png)

In this article, I will explain how to create a streaming granular, JG-Granular, especially how to implement it using the C++ code exported by gen~ and JUCE parameter management approach, AudioProcessorValueTreeState(APVTS).

The source code and patch for JG-Granular are available from the repository below:

[szkkng/JG-Granular](https://github.com/szkkng/jg-granular)

```text:CommandLine
$ git clone https://github.com/szkkng/jg-granular.git
```

## gen~

This patcher is based on the granular patcher created by [suzuki kentaro](https://twitter.com/szk_1992) in the 20th lecture of [AMCJ (Ableton and Max Community Japan)](https://twitter.com/AMCJ_Official), and only the gain parameter is newly added. You can find this patcher in Patcher directory in the repository above.

![patch.png](/images/jg-granular/patch.png)

### CodeBox

Inside gen~, CodeBox is used and the optimized code is written in it:
![gen.png](/images/jg-granular/gen.png)

### C++ export

To export genpatcher as C++ code, send the exportcode message to gen~:
![exportcode.png](/images/jg-granular/exportcode.png)

## JUCE

The following source code is very helpful for how to link the C++ code exported by gen~ with JUCE, but it does not use APVTS.

[Cycling74/gen-plugin-export](https://github.com/Cycling74/gen-plugin-export)

I personally recommend this approach as it is much easier to implement the UI and DSP linking part.

In this article, I will focus on how to implement using APVTS, so I will omit explanations such as setting the header search path. Please refer to the following article for a detailed explanation of these settings.

[Gigaverb - JUCE × gen~](https://suzuki-kengo.dev/posts/gigaverb-gen-juce)

### APVTS

In order to reflect the changes in the parameters managed by APVTS to the parameters of the exported gen~ object, we use [parameterChanged()](https://docs.juce.com/master/structAudioProcessorValueTreeState_1_1Listener.html#a2716fa16ef99141f599ffd7c93682552) function.

```c++:PluginProcessor.h
class JGGranularAudioProcessor  : public juce::AudioProcessor, public juce::AudioProcessorValueTreeState::Listener
{
public:
・・・
    using APVTS = juce::AudioProcessorValueTreeState;
    APVTS::ParameterLayout createParameterLayout();
    APVTS apvts { *this, &undoManager, "Parameters", createParameterLayout() };

    void parameterChanged (const juce::String& parameterID, float newValue) override;

private:
・・・
};
```

Then, use [addParameterListener()](https://docs.juce.com/master/classAudioProcessorValueTreeState.html#a350478cad727aa6ceac20e1c933446fc) to register a callback.

```c++:PluginProcessor.cpp
JGGranularAudioProcessor::JGGranularAudioProcessor() : m_CurrentBufferSize (0)
{
・・・
    for (int i = 0; i < gen_exported::num_params(); i++)
    {
        auto name = juce::String (gen_exported::getparametername (m_C74PluginState, i));
        apvts.addParameterListener (name, this);
    }
}
```

The implementation part of parameterChanged() is as follows:

```c++:PluginProcessor.cpp
void JGGranularAudioProcessor::parameterChanged (const juce::String& parameterID, float newValue)
{
    auto index = apvts.getParameter (parameterID)->getParameterIndex();
    gen_exported::setparameter (m_C74PluginState, index + 1, newValue, nullptr);
}
```

To set a new parameter for the exported gen~ object, use the gen_exported::setparameter function. You need to pass the index of the parameter to be updated to this function.

If you want to check the indexes of these parameters, call gen_exported::getparametername() and output it to the console.

```c++:PluginProcessor.cpp
JGGranularAudioProcessor::JGGranularAudioProcessor() : m_CurrentBufferSize (0)
{
・・・
    for (int i = 0; i < gen_exported::num_params(); ++i)
    {
        auto name = juce::String (gen_exported::getparametername (m_C74PluginState, i));
        DBG (name);
    }
}
```

In the case of JG-Granular, the output will look like the following:

```text
data_param
dw
gain
grainPos
grainSize
interval
pitch
width
```

As you can see, the parameters are assigned an index in alphabetical order. In this case, the parameter that the user manipulates is anything other than data_param. Therefore, in order to map this index to the parameter index of APVTS, pass index plus 1 as the argument of setparameter() in parameterChanged() above. Then, add the parameters to be managed by APVTS to the layout in alphabetical order as shown below. In this way, the indexes of the parameters in gen~ can be mapped to the indexes of the parameters managed by APVTS.

```c++:PluginProcessor.cpp
juce::AudioProcessorValueTreeState::ParameterLayout JGGranularAudioProcessor::createParameterLayout()
{
    APVTS::ParameterLayout layout;

    layout.add (std::make_unique<juce::AudioParameterFloat> ("dw", "dw",
                                                             juce::NormalisableRange<float> (0.0f, 100.0f, 0.01f, 1.0f),
                                                             50.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                 if (value < 10.0f)
                                                                     return juce::String (value, 2) + " %";
                                                                 else if (value < 100.0f)
                                                                     return juce::String (value, 1) + " %";
                                                                 else
                                                                     return juce::String (value, 0) + " %"; },
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("gain", "gain",
                                                             juce::NormalisableRange<float> (-70.0, 6.0, 0.1f, 2.2f),
                                                             0.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                             if (value <= -10.0f)
                                                                return juce::String (std::floorf (value), 0) + " dB";
                                                             else
                                                                return juce::String (value, 1) + " dB"; },
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("grainPos", "grainPos",
                                                             juce::NormalisableRange<float> (10.0f, 500.0f, 0.1f, 0.405f),
                                                             100.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                if (value < 100.0f)
                                                                    return juce::String (value, 1) + " ms";
                                                                else
                                                                    return juce::String (std::floorf(value), 0) + " ms"; },
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("grainSize", "grainSize",
                                                             juce::NormalisableRange<float> (10.0f, 500.0f, 0.1f, 0.405f),
                                                             100.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                if (value < 100.0f)
                                                                    return juce::String (value, 1) + " ms";
                                                                else
                                                                    return juce::String (std::floorf (value)) + " ms";},
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("interval", "interval",
                                                             juce::NormalisableRange<float> (10.0f, 500.0f, 0.1f, 0.405f),
                                                             100.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                if (value < 100.0f)
                                                                    return juce::String (value, 1) + " ms";
                                                                else
                                                                    return juce::String (std::floorf (value)) + " ms";},
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("pitch", "pitch",
                                                             juce::NormalisableRange<float> (-12.0f, 12.0f, 0.1f, 1.0f),
                                                             0.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                return juce::String (value, 1) + " st"; },
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> ("width", "width",
                                                             juce::NormalisableRange<float> (0.0f, 100.0f, 0.01f, 1.0f),
                                                             50.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                 if (value < 10.0f)
                                                                     return juce::String (value, 2) + " %";
                                                                 else if (value < 100.0f)
                                                                     return juce::String (value, 1) + " %";
                                                                 else
                                                                     return juce::String (value, 0) + " %"; },
                                                             nullptr));

    return layout;
}
```

### Dial

The following dials are used for JG-Granular.

[szkkng/modern-dial](https://github.com/szkkng/modern-dial.git)
![modern-dial.png](/images/jg-granular/modern-dial.png)

They have the following features:

- focus mark
- sensitivity \* 0.1 (shift + drag)
- edit mode

The following article explains in detail how to create this dial. If you are interested, please check it out.

[Dial Customization](http://suzuki-kengo.dev/posts/dial-customization)

## Summary

In this article, I explained how to implement JG-Granular using the exported gen~ C++ code and JUCE APVTS. If there is any part of the code that could be written more efficiently, or if there is anything that is wrong, I would love to hear your comments via Twitter DM. Thank you for reading to the end!

## References

- [Cycling74/gen-plugin-export](https://github.com/Cycling74/gen-plugin-export)
- [MaxMsp/Gen Param -> Slider linking - JUCE Forum](https://forum.juce.com/t/maxmsp-gen-param-slider-linking/27348)
