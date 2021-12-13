---
title: 'JG-Granular - JUCE × gen~'
date: '2021-12-12'
thumbnail: '/images/jg-granular/jg-granular.png'
---

## Introduction

![jg-granular.png](/images/jg-granular/jg-granular.png)

```bash
$ git clone ~~~~~.git
```

## gen~

![patch.png](/images/jg-granular/patch.png)

### CodeBox

![gen.png](/images/jg-granular/gen.png)

### C++ export

![exportcode.png](/images/jg-granular/exportcode.png)

## JUCE

### APVTS

PluginProcessor.h

```c++
#pragma once

#include <JuceHeader.h>
#include "gen_exported.h"
```

```c++
class JGGranularAudioProcessor  : public juce::AudioProcessor, public juce::AudioProcessorValueTreeState::Listener
{
public:
・・・
    using APVTS = juce::AudioProcessorValueTreeState;
    APVTS::ParameterLayout createParameterLayout();
    APVTS apvts { *this, &undoManager, "Parameters", createParameterLayout() };

    void parameterChanged (const juce::String& parameterID, float newValue) override;

protected:
    void assureBufferSize (long bufferSize);

private:
    //==============================================================================
    CommonState* m_C74PluginState;
    long m_CurrentBufferSize;
    t_sample** m_InputBuffers;
    t_sample** m_OutputBuffers;
・・・
};
```

PluginProcessor.cpp

```c++
JGGranularAudioProcessor::JGGranularAudioProcessor() : m_CurrentBufferSize (0)
{
    m_C74PluginState = (CommonState*) gen_exported::create (44100, 64);
    gen_exported::reset (m_C74PluginState);

    m_InputBuffers  = new t_sample *[gen_exported::num_inputs()];
    m_OutputBuffers = new t_sample *[gen_exported::num_outputs()];

    for (int i = 0; i < gen_exported::num_inputs(); i++)
        m_InputBuffers[i] = nullptr;

    for (int i = 0; i < gen_exported::num_outputs(); i++)
        m_OutputBuffers[i] = nullptr;

    for (int i = 0; i < gen_exported::num_params(); ++i)
    {
        auto name = juce::String (gen_exported::getparametername (m_C74PluginState, i));
        apvts.addParameterListener (name, this);
    }
}
```

```c++
void JGGranularAudioProcessor::prepareToPlay (double sampleRate, int samplesPerBlock)
{
    m_C74PluginState->sr = sampleRate;
    m_C74PluginState->vs = samplesPerBlock;

    assureBufferSize (samplesPerBlock);
}
```

```c++
void JGGranularAudioProcessor::processBlock (juce::AudioBuffer<float>& buffer, juce::MidiBuffer& midiMessages)
{
    juce::ScopedNoDenormals noDenormals;
    assureBufferSize (buffer.getNumSamples());

    for (int i = 0; i < gen_exported::num_inputs(); i++)
    {
        if (i < getTotalNumInputChannels())
        {
            for (int j = 0; j < m_CurrentBufferSize; j++)
                m_InputBuffers[i][j] = buffer.getReadPointer (i)[j];
        }
        else
        {
            memset (m_InputBuffers[i], 0, m_CurrentBufferSize *  sizeof (double));
        }
    }

    gen_exported::perform (m_C74PluginState,
                           m_InputBuffers,
                           gen_exported::num_inputs(),
                           m_OutputBuffers,
                           gen_exported::num_outputs(),
                           buffer.getNumSamples());

    for (int i = 0; i < getTotalNumOutputChannels(); i++)
    {
        if (i < gen_exported::num_outputs())
        {
            for (int j = 0; j < buffer.getNumSamples(); j++)
                buffer.getWritePointer (i)[j] = m_OutputBuffers[i][j];
        }
        else
        {
            buffer.clear (i, 0, buffer.getNumSamples());
        }
    }
}
```

```c++
void JGGranularAudioProcessor::parameterChanged (const juce::String& parameterID, float newValue)
{
    auto index = apvts.getParameter (parameterID)->getParameterIndex();
    gen_exported::setparameter (m_C74PluginState, index + 1, newValue, nullptr);
}
```

```c++
juce::AudioProcessorValueTreeState::ParameterLayout JGGranularAudioProcessor::createParameterLayout()
{
    juce::AudioProcessorValueTreeState::ParameterLayout layout;

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

```c++

```

```c++

```

### Dial

- [Modern Dial](https://github.com/szkkng/modern-dial.git)

## Summary

## References
