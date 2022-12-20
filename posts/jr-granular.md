---
title: 'JR-Granular - JUCE & RNBO C++ Export'
createdDate: '2022-11-02'
updatedDate: '2022-11-23'
thumbnail: '/images/jr-granular/jr-granular.png'
---

## Introduction

![jr-granular.png](/images/jr-granular/jr-granular.png)

In this tutorial I will show you how to make [JR-Granular](https://github.com/szkkng/jr-granular), a real-time granular fx plugin, with 
RNBO C++ export and JUCE. In particular, I will focus on the following:
- how to do the RNBO C++ export
- how to connect the exported code and JUCE using [APVTS](https://docs.juce.com/master/classAudioProcessorValueTreeState.html)
- how to make custom UIs with JUCE 

Let's get started.

### Prerequisites
- Install Xcode Command Line Tools by running "xcode-select --install".
- Download and install [CMake](https://cmake.org/download/) by running "brew install cmake".
- Get Projucer by downloading [JUCE](https://juce.com/get-juce/download).

## Making rnbo-granular.maxpat

In this chapter we will quickly implement a real-time granular fx using the gen~ codebox.

1. Create a rnbo~ object.

![create-rnbo-object.png](/images/jr-granular/create-rnbo-object.png)

2. Create a gen~ object in the rnbo patcher

![create-gen-object.png](/images/jr-granular/create-gen-object.png)

3. Create a codebox object in the gen patcher

![create-codebox.png](/images/jr-granular/create-codebox.png)

4. Copy the following gen code and paste it into the codebox.

![codebox.png](/images/jr-granular/codebox.png)

```c++:codebox
Param interval(100);
Param grainSize(100);
Param grainPos(100);
Param width(0.5);
Param pitch(0);
Param mix(0.5);
Param gain(0);

Delay del_inL(samplerate * 2);
Delay del_inR(samplerate * 2);

Data data_param(6, 100);

History his_index(0);
History his_mix(0), his_gain(0);

his_mix = (mix - his_mix) * 0.001 + his_mix;
his_gain = (gain - his_gain) * 0.001 + his_gain;

maxVoice = 100;

del_inL.write(in1);
del_inR.write(in2);

mCout = counter(1, 0, mstosamps(interval));
if (mCout == 1) {
	if (peek(data_param, 0, his_index) == 0) {
		poke(data_param, 1, 0, his_index);
		poke(data_param, mstosamps(grainSize), 1, his_index);
		sizeScaled = mstosamps(grainSize);
		widthRand = noise() * 0.5 * width;
		poke(data_param, 0.5 + widthRand, 3, his_index);
		poke(data_param, 0.5 - widthRand, 4, his_index);
		pitchScaled = pow(2, pitch / 12) - 1;
		poke(data_param, pitchScaled, 5, his_index);
		his_index = wrap(his_index + 1, 0, maxVoice);
		posScaled = mstosamps(grainPos) * abs(noise());
		poke(data_param, posScaled + max(sizeScaled*pitchScaled, 0), 2, his_index);
	}
}

outL = 0;
outR = 0;
totalWin = 0;
for (i = 0; i < maxVoice; i += 1) {
	pCout = peek(data_param, 0, i);
	if (pCout != 0) {
		s = peek(data_param, 1, i);
		if (pCout < s) {
			pCoutScaled = pCout / s;
			win = 0.5 * (sin (1.5 * PI + pCoutScaled * TWOPI) + 1);
			outputL = del_inL.read(peek(data_param, 2, i) - pCout * peek(data_param, 5, i)) * win;
			outputR = del_inR.read(peek(data_param, 2, i) - pCout * peek(data_param, 5, i)) * win;
			outL += outputL * peek(data_param, 3, i);
			outR += outputR * peek(data_param, 4, i);
			poke(data_param, pCout + 1, 0, i);
			totalWin += win;
		} else {
			poke(data_param, 0, 0, i);
		}
	}
}

normalise = pow(1 / max(totalWin, 1), 0.3) * his_gain;
out1 = mix(in1, outL * normalise, his_mix);
out2 = mix(in2, outR * normalise, his_mix);
```
5. Finally, create param and setparam objects as shown below:

![gen-and-others.png](/images/jr-granular/gen-and-others.png)

## Setting up a JUCE project

First, open Projucer and create a new project named JRGranular to generate the template files PluginProcessor.h/cpp and PluginEditor.h/cpp. 
We will build our projects using CMake, so we will not use Projucer anymore.

![new-project.png](/images/jr-granular/new-project.png)

Go to the project directory and delete unnecessary files.

```text:CommandLine
$ cd ~/Desktop/JRGranular
$ rm -rf Builds JuceLibraryCode JRGranular.jucer
```
Add JUCE v7.0.2 to the project with the following command:

```text:CommandLine
$ git init
$ git submodule add https://github.com/juce-framework/JUCE.git External/JUCE
$ cd External/JUCE
$ git checkout 7.0.2
$ cd -
```
Create RnboExport directory for RNBO C++ export destination.

```text:CommandLine
$ mkdir RnboExport
```
Create a CMakeLists.txt file, copy and paste the following code into it

```text:CommandLine
$ touch CMakeLists.txt
```
```text:CMakeLists.txt
cmake_minimum_required(VERSION 3.21)

set(PROJECT_NAME "JR-Granular")
set(CMAKE_OSX_ARCHITECTURES "arm64;x86_64" CACHE STRING "Build architectures for macOS")
set(CMAKE_OSX_DEPLOYMENT_TARGET "10.11" CACHE STRING "Minimum macOS version required")

project("${PROJECT_NAME}" VERSION 1.0.0)

set(formats "VST3" "Standalone")

if(APPLE)
    list(APPEND formats "AU")
endif()

add_subdirectory(External/JUCE)

juce_add_plugin("${PROJECT_NAME}"
    VERSION "1.0.0"
    COMPANY_NAME "JR-Granular"
    PLUGIN_MANUFACTURER_CODE "Jrgn"
    PLUGIN_CODE "R001"
    FORMATS ${formats}
    COPY_PLUGIN_AFTER_BUILD TRUE
    IS_SYNTH FALSE     
    NEEDS_MIDI_INPUT FALSE
    NEEDS_MIDI_OUTPUT FALSE
    IS_MIDI_EFFECT FALSE
    PRODUCT_NAME "${PROJECT_NAME}")

juce_generate_juce_header("${PROJECT_NAME}")

include_directories(
    "${CMAKE_CURRENT_SOURCE_DIR}/RnboExport/rnbo"
    "${CMAKE_CURRENT_SOURCE_DIR}/RnboExport/rnbo/common")

target_sources("${PROJECT_NAME}"
    PRIVATE
        RnboExport/rnbo_granular.cpp
        RnboExport/rnbo/RNBO.cpp
        Source/PluginProcessor.cpp
        Source/PluginEditor.cpp)

target_compile_features("${PROJECT_NAME}" PUBLIC cxx_std_20)

target_compile_definitions("${PROJECT_NAME}"
    PUBLIC
        JUCE_WEB_BROWSER=0
        JUCE_USE_CURL=0
        JUCE_VST3_CAN_REPLACE_VST2=0)

target_link_libraries("${PROJECT_NAME}"
    PRIVATE
        juce::juce_audio_utils
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags)
```

After these settings, your directory structure should look something like this:

![directories.png](/images/jr-granular/directory-structure.png)

## RNBO C++ Export

Click on the export sidebar button located in the right toolbar, and select the C++ Source Code Export.

![export-sidebar.png](/images/jr-granular/export-sidebar.png)

Click on the choose button to specify the RnboExport directory as the output directory.
![output-directory.png](/images/jr-granular/output-directory.png)

Change the Export Name and the Classname as follows:
![names.png](/images/jr-granular/names.png)

Click on the Export to Selected Target button at the bottom right of the window. If there are no error messages in the Export Log, you have succeeded.
![export.png](/images/jr-granular/export.png)

Return to the console and check that the project can be built successfully.

```text:CommandLine
$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
$ cmake --build build --config Debug
```

Run the standalone with the following command. You should see "Hello, World".
```text:CommandLine
$ build/JR-Granular_artefacts/Debug/Standalone/JR-Granular.app/Contents/MacOS/JR-Granular
```

![hello-world.png](/images/jr-granular/hello-world.png)

## Connecting the exported code with JUCE
This chapter explains how to link the exported c++ code with JUCE. My approach is to use [juce::AudioProcessorValueTreeState](https://docs.juce.com/master/classAudioProcessorValueTreeState.html). 

### ParamIDs.h

First, create the string IDs in ParamIDs.h, which are needed when creating JUCE apvts parameters and when linking the UI and DSP. I do this to prevent typing errors. The value of each variable must correspond to the value of "paramId" listed in the RnboExport/description.json.

```text:CommandLine
$ touch Source/ParamIDs.h
```
```C++:ParamIDs.h
#pragma once

namespace ParamIDs
{

    // Be the same value as the "paramId" listed in the rnbo description.json.
    inline constexpr auto mix       { "mix" };
    inline constexpr auto gain      { "gain" };
    inline constexpr auto grainPos  { "grainPos" };
    inline constexpr auto grainSize { "grainSize" };
    inline constexpr auto interval  { "interval" };
    inline constexpr auto pitch     { "pitch" };
    inline constexpr auto width     { "width" };

} // namespace paramIDs
```

### PluginProcessor.h/cpp

PluginProcessor.h/cpp is as follows.

```C++:PluginProcessor.h
#pragma once

#include <JuceHeader.h>
#include "RNBO.h"

class JRGranularAudioProcessor  : public juce::AudioProcessor,
                                  public juce::AudioProcessorValueTreeState::Listener
{
public:
    //==============================================================================
    JRGranularAudioProcessor();
    ~JRGranularAudioProcessor() override;

    //==============================================================================
    void prepareToPlay (double sampleRate, int samplesPerBlock) override;
    void releaseResources() override;

   #ifndef JucePlugin_PreferredChannelConfigurations
    bool isBusesLayoutSupported (const BusesLayout& layouts) const override;
   #endif

    void processBlock (juce::AudioBuffer<float>&, juce::MidiBuffer&) override;

    //==============================================================================
    juce::AudioProcessorEditor* createEditor() override;
    bool hasEditor() const override;

    //==============================================================================
    const juce::String getName() const override;

    bool acceptsMidi() const override;
    bool producesMidi() const override;
    bool isMidiEffect() const override;
    double getTailLengthSeconds() const override;

    //==============================================================================
    int getNumPrograms() override;
    int getCurrentProgram() override;
    void setCurrentProgram (int index) override;
    const juce::String getProgramName (int index) override;
    void changeProgramName (int index, const juce::String& newName) override;

    //==============================================================================
    void getStateInformation (juce::MemoryBlock& destData) override;
    void setStateInformation (const void* data, int sizeInBytes) override;

    void parameterChanged (const juce::String& parameterID, float newValue) override;

private:
    //==============================================================================
    juce::AudioProcessorValueTreeState apvts;
    juce::UndoManager undoManager;

    RNBO::CoreObject rnboObject;

    std::unordered_map<juce::String, RNBO::ParameterIndex> apvtsParamIdToRnboParamIndex;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (JRGranularAudioProcessor)
};
```

```C++:PluginProcessor.cpp
#include "PluginProcessor.h"
#include "PluginEditor.h"
#include "ParamIDs.h"

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
                                                             "intv",
                                                             juce::NormalisableRange<float> (10.0f, 500.0f, 0.01f, 0.405f),
                                                             100.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             msFormat,
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::pitch, 1 }, 
                                                             ParamIDs::pitch,
                                                             juce::NormalisableRange<float> (-12.0f, 12.0f, 0.1f, 1.0f),
                                                             0.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                                return juce::String (value, 1) + " st"; },
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::grainPos, 1 }, 
                                                             "pos",
                                                             juce::NormalisableRange<float> (10.0f, 500.0f, 1.0f, 0.405f),
                                                             100.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             msFormat,
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::grainSize, 1 }, 
                                                             "size",
                                                             juce::NormalisableRange<float> (10.0f, 500.0f, 0.01f, 0.405f),
                                                             100.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             msFormat,
                                                             nullptr));

    auto percentFormat = [](float value, int)
    {
         if (value < 10.0f)
             return juce::String (value, 2) + " %";
         else if (value < 100.0f)
             return juce::String (value, 1) + " %";
         else
             return juce::String (value, 0) + " %"; 
    };

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::mix, 1 }, 
                                                             ParamIDs::mix,
                                                             juce::NormalisableRange<float> (0.0f, 100.0f, 0.01f, 1.0f),
                                                             50.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             percentFormat,
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::width, 1 }, 
                                                             ParamIDs::width,
                                                             juce::NormalisableRange<float> (0.0f, 100.0f, 0.01f, 1.0f),
                                                             50.0,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             percentFormat,
                                                             nullptr));

    layout.add (std::make_unique<juce::AudioParameterFloat> (juce::ParameterID { ParamIDs::gain, 1 }, 
                                                             "vol",
                                                             juce::NormalisableRange<float> (-36.0f, 12.0f, 0.1f, 2.4f),
                                                             0.0f,
                                                             juce::String(),
                                                             juce::AudioProcessorParameter::genericParameter,
                                                             [](float value, int) {
                                                             if (-10.0f < value && value < 10.0f)
                                                                 return juce::String (value, 1) + " dB";
                                                             else
                                                                 return juce::String (std::roundf (value), 0) + " dB"; },
                                                             nullptr));

    return layout;
}

//==============================================================================
JRGranularAudioProcessor::JRGranularAudioProcessor()
#ifndef JucePlugin_PreferredChannelConfigurations
     : AudioProcessor (BusesProperties()
                     #if ! JucePlugin_IsMidiEffect
                      #if ! JucePlugin_IsSynth
                       .withInput  ("Input",  juce::AudioChannelSet::stereo(), true)
                      #endif
                       .withOutput ("Output", juce::AudioChannelSet::stereo(), true)
                     #endif
                       ),
#endif
       apvts (*this, &undoManager, "Parameters", createParameterLayout())
{
    for (RNBO::ParameterIndex i = 0; i < rnboObject.getNumParameters(); ++i)
    {
        RNBO::ParameterInfo info;
        rnboObject.getParameterInfo (i, &info);

        if (info.visible)
        {
            auto paramID = juce::String (rnboObject.getParameterId (i));

            // Each apvts parameter id and range must be the same as the rnbo param object's.
            // If you hit this assertion then you need to fix the incorrect id in ParamIDs.h.
            jassert (apvts.getParameter (paramID) != nullptr);  

            // If you hit these assertions then you need to fix the incorrect apvts 
            // parameter range in createParameterLayout().
            jassert (info.min == apvts.getParameterRange (paramID).start);
            jassert (info.max == apvts.getParameterRange (paramID).end);

            apvtsParamIdToRnboParamIndex[paramID] = i;

            apvts.addParameterListener (paramID, this);
            rnboObject.setParameterValue (i, apvts.getRawParameterValue (paramID)->load());
        }
    }
}

JRGranularAudioProcessor::~JRGranularAudioProcessor()
{
}

//==============================================================================
const juce::String JRGranularAudioProcessor::getName() const
{
    return JucePlugin_Name;
}

bool JRGranularAudioProcessor::acceptsMidi() const
{
   #if JucePlugin_WantsMidiInput
    return true;
   #else
    return false;
   #endif
}

bool JRGranularAudioProcessor::producesMidi() const
{
   #if JucePlugin_ProducesMidiOutput
    return true;
   #else
    return false;
   #endif
}

bool JRGranularAudioProcessor::isMidiEffect() const
{
   #if JucePlugin_IsMidiEffect
    return true;
   #else
    return false;
   #endif
}

double JRGranularAudioProcessor::getTailLengthSeconds() const
{
    return 0.0;
}

int JRGranularAudioProcessor::getNumPrograms()
{
    return 1;   // NB: some hosts don't cope very well if you tell them there are 0 programs,
                // so this should be at least 1, even if you're not really implementing programs.
}

int JRGranularAudioProcessor::getCurrentProgram()
{
    return 0;
}

void JRGranularAudioProcessor::setCurrentProgram (int index)
{
    juce::ignoreUnused (index);
}

const juce::String JRGranularAudioProcessor::getProgramName (int index)
{
    juce::ignoreUnused (index);
    return {};
}

void JRGranularAudioProcessor::changeProgramName (int index, const juce::String& newName)
{
    juce::ignoreUnused (index, newName);
}

//==============================================================================
void JRGranularAudioProcessor::prepareToPlay (double sampleRate, int samplesPerBlock)
{
    rnboObject.prepareToProcess (sampleRate, static_cast<size_t> (samplesPerBlock));
}

void JRGranularAudioProcessor::releaseResources()
{
    // When playback stops, you can use this as an opportunity to free up any
    // spare memory, etc.
}

#ifndef JucePlugin_PreferredChannelConfigurations
bool JRGranularAudioProcessor::isBusesLayoutSupported (const BusesLayout& layouts) const
{
  #if JucePlugin_IsMidiEffect
    juce::ignoreUnused (layouts);
    return true;
  #else
    // This is the place where you check if the layout is supported.
    // In this template code we only support mono or stereo.
    // Some plugin hosts, such as certain GarageBand versions, will only
    // load plugins that support stereo bus layouts.
    if (layouts.getMainOutputChannelSet() != juce::AudioChannelSet::mono()
     && layouts.getMainOutputChannelSet() != juce::AudioChannelSet::stereo())
        return false;

    // This checks if the input layout matches the output layout
   #if ! JucePlugin_IsSynth
    if (layouts.getMainOutputChannelSet() != layouts.getMainInputChannelSet())
        return false;
   #endif

    return true;
  #endif
}
#endif

void JRGranularAudioProcessor::processBlock (juce::AudioBuffer<float>& buffer, juce::MidiBuffer& midiMessages)
{
    juce::ignoreUnused (midiMessages);
    auto bufferSize = buffer.getNumSamples();

    rnboObject.prepareToProcess (getSampleRate(), 
                                 static_cast<size_t> (bufferSize));

    rnboObject.process (buffer.getArrayOfWritePointers(),
                        static_cast<RNBO::Index> (buffer.getNumChannels()),
                        buffer.getArrayOfWritePointers(),
                        static_cast<RNBO::Index> (buffer.getNumChannels()),
                        static_cast<RNBO::Index> (bufferSize));
}

//==============================================================================
bool JRGranularAudioProcessor::hasEditor() const
{
    return true; // (change this to false if you choose to not supply an editor)
}

juce::AudioProcessorEditor* JRGranularAudioProcessor::createEditor()
{
    return new JRGranularAudioProcessorEditor (*this, apvts, undoManager);
    /* return new juce::GenericAudioProcessorEditor (*this); */
}

//==============================================================================
void JRGranularAudioProcessor::getStateInformation (juce::MemoryBlock& destData)
{
    juce::MemoryOutputStream mos (destData, true);
    apvts.state.writeToStream (mos);
}

void JRGranularAudioProcessor::setStateInformation (const void* data, int sizeInBytes)
{
    auto tree = juce::ValueTree::readFromData (data, static_cast<size_t> (sizeInBytes));

    if (tree.isValid())
        apvts.replaceState (tree);
}

void JRGranularAudioProcessor::parameterChanged (const juce::String& parameterID, float newValue)
{
    rnboObject.setParameterValue (apvtsParamIdToRnboParamIndex[parameterID], newValue);
}

//==============================================================================
// This creates new instances of the plugin..
juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter()
{
    return new JRGranularAudioProcessor();
}
```

Now you have completed the minimum configuration required to link the exported code to JUCE.

## GenericAudioProcessorEditor

Using juce::GenericAudioProcessorEditor, you can quickly build the plugin without implementing the UI. Edit the following and build it.

```C++:PluginProcessor.cpp
juce::AudioProcessorEditor* JRGranularAudioProcessor::createEditor()
{
    /* return new JRGranularAudioProcessorEditor (*this, apvts, undoManager); */
    return new juce::GenericAudioProcessorEditor (*this);
}
```

```text:CommandLine
$ rm -rf build
$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
$ cmake --build build --config Release
```

After the successful build, you can run the VST3/AU plugin on your DAW.

![generic-editor.png](/images/jr-granular/generic-editor.png)

## Customising the JUCE UI

### Preparing for the customisation

We will use the plugin editor, so disable the GenericAudioProcessorEditor:

```C++:PluginProcessor.cpp
juce::AudioProcessorEditor* JRGranularAudioProcessor::createEditor()
{
    return new JRGranularAudioProcessorEditor (*this, apvts, undoManager);
    /* return new juce::GenericAudioProcessorEditor (*this); */
}
```

Create customised colours for use in the UI.

```text:CommandLine
$ touch Source/MyColours.h
```

```C++:MyColours.h
#pragma once
#include <JuceHeader.h>

namespace MyColours
{
    const juce::Colour blue      { 0xff6dd4ff };
    const juce::Colour cream     { 0xfff6f9e4 };
    const juce::Colour grey      { 0xffa0a0a0 };
    const juce::Colour midGrey   { 0xff666666 };
    const juce::Colour blackGrey { 0xff353535 };
    const juce::Colour black     { 0xff141414 };
    const juce::Colour red       { 0xffff3f3f };
}
```

After this, your directory structure should look something like this:
![directories.png](/images/jr-granular/directories.png)

Edit PluginEditor.h/cpp as follows. This section implements the Undo/Redo features and other small UI settings.

```C++:PluginEditor.h
#include <JuceHeader.h>
#include "PluginProcessor.h"

class JRGranularAudioProcessorEditor  : public juce::AudioProcessorEditor
{
public:
    JRGranularAudioProcessorEditor (JRGranularAudioProcessor& p,
                                    juce::AudioProcessorValueTreeState& state,
                                    juce::UndoManager& um);

    ~JRGranularAudioProcessorEditor() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    bool keyPressed (const juce::KeyPress& key) override;

private:
    JRGranularAudioProcessor& audioProcessor;
    juce::UndoManager& undoManager;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (JRGranularAudioProcessorEditor)
};
```

```c++:PluginEditor.cpp
#include "PluginProcessor.h"
#include "PluginEditor.h"
#include "MyColours.h"

JRGranularAudioProcessorEditor::JRGranularAudioProcessorEditor (JRGranularAudioProcessor& p,
                                                                juce::AudioProcessorValueTreeState& state,
                                                                juce::UndoManager& um)
    : AudioProcessorEditor (&p), audioProcessor (p), undoManager (um)
{
    setWantsKeyboardFocus (true);
    setSize (440, 280);
}

JRGranularAudioProcessorEditor::~JRGranularAudioProcessorEditor()
{
}

void JRGranularAudioProcessorEditor::paint (juce::Graphics& g)
{
    g.fillAll (MyColours::black);
}

void JRGranularAudioProcessorEditor::resized()
{
}

bool JRGranularAudioProcessorEditor::keyPressed (const juce::KeyPress& key)
{
    const auto cmdZ = juce::KeyPress { 'z', juce::ModifierKeys::commandModifier, 0 };

    if (key == cmdZ && undoManager.canUndo())
    {
        undoManager.undo();
        return true;
    }

    const auto cmdShiftZ = juce::KeyPress { 'z', juce::ModifierKeys::commandModifier 
                                                 | juce::ModifierKeys::shiftModifier, 0 };

    if (key == cmdShiftZ && undoManager.canRedo())
    {
        undoManager.redo();
        return true;
    }

    return false;
}
```

After completing the above settings, build and run the standalone and you should see a black editor as shown below.

```text:CommandLine
$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
$ cmake --build build --config Debug
$ build/JR-Granular_artefacts/Debug/Standalone/JR-Granular.app/Contents/MacOS/JR-Granular
```

![setting-up.png](/images/jr-granular/setting-up.png)

### Adding the custom dial component

This chapter adds customised UI components. 

This Dial has the same look and feel as Ableton's Dial and reproduces equivalent features:
- value changes: dragging or arrow keys
- fine mode: shift + dragging or shift + arrow keys
- edit mode: 0-9
- undo: [mac] cmd + z, [win] ctrl + z
- redo: [mac] cmd + shift + z, [win] ctrl + shift + z
- reset: double click

Create Dial.h/cpp files.

```text:CommandLine
$ touch Source/Dial.{h,cpp}
```

Copy and paste the contents of Dial.h/cpp from the link below.
- [Dial.h](https://github.com/szkkng/jr-granular/blob/main/Source/GUI/Dial.h)
- [Dial.cpp](https://github.com/szkkng/jr-granular/blob/main/Source/GUI/Dial.cpp)

Add the following line to the CMakeLists.txt file.

```diff:CMakeLists.txt
...
target_sources("${PROJECT_NAME}"
    PRIVATE
        RnboExport/rnbo_granular.cpp
        RnboExport/rnbo/RNBO.cpp
        Source/PluginProcessor.cpp
        Source/PluginEditor.cpp
+       Source/Dial.cpp)
...
```

Include the Dial.h file and declare the Dial objects.

```c++:PluginEditor.h
#include "Dial.h"
```

```c++:PluginEditor.h
class JRGranularAudioProcessorEditor  : public juce::AudioProcessorEditor
{
public:
...
private:
...
    Dial intvDial;
    Dial pitchDial;
    Dial sizeDial;
    Dial posDial;
    Dial widthDial;
    Dial mixDial;
    Dial gainDial;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (JRGranularAudioProcessorEditor)
};
```

Connect the corresponding APVTS parameters to each Dial and set them to be displayed in the plugin editor.

```c++:PluginEditor.cpp
#include "ParamIDs.h"
```
```c++:PluginEditor.cpp
JRGranularAudioProcessorEditor::JRGranularAudioProcessorEditor (JRGranularAudioProcessor& p,
                                                                juce::AudioProcessorValueTreeState& state,
                                                                juce::UndoManager& um)
    : AudioProcessorEditor (&p), audioProcessor (p), undoManager (um),
      intvDial  (*state.getParameter (ParamIDs::interval),  um),
      pitchDial (*state.getParameter (ParamIDs::pitch),     um),
      sizeDial  (*state.getParameter (ParamIDs::grainSize), um),
      posDial   (*state.getParameter (ParamIDs::grainPos),  um),
      widthDial (*state.getParameter (ParamIDs::width),     um),
      mixDial   (*state.getParameter (ParamIDs::mix),       um),
      gainDial  (*state.getParameter (ParamIDs::gain),      um)

{
    setWantsKeyboardFocus (true);
    setSize (440, 280);

    intvDial.setLabelText ("intv");
    mixDial.setLabelText  ("mix");
    posDial.setLabelText  ("pos");
    sizeDial.setLabelText ("size");
    gainDial.setLabelText ("vol");

    // Set interval of values changed by arrow keys or shift + arrow keys.
    intvDial.setInterval (5.0f);
    intvDial.setFineInterval (1.0f);
    sizeDial.setInterval (5.0f);
    sizeDial.setFineInterval (1.0f);
    posDial.setInterval (5.0f);
    posDial.setFineInterval (1.0f);
    pitchDial.setInterval (1.0f);
    pitchDial.setFineInterval (0.1f);
    gainDial.setInterval (1.0f);
    gainDial.setFineInterval (0.1f);

    addAndMakeVisible (sizeDial);
    addAndMakeVisible (posDial);
    addAndMakeVisible (intvDial);
    addAndMakeVisible (widthDial);
    addAndMakeVisible (pitchDial);
    addAndMakeVisible (mixDial);
    addAndMakeVisible (gainDial);
}
```
```c++:PluginEditor.cpp
void JRGranularAudioProcessorEditor::resized()
{
    intvDial.setBounds  (30,  30,  80, 95);
    pitchDial.setBounds (130, 30,  80, 95);
    sizeDial.setBounds  (230, 30,  80, 95);
    posDial.setBounds   (330, 30,  80, 95);
    widthDial.setBounds (80,  155, 80, 95);
    mixDial.setBounds   (180, 155, 80, 95);
    gainDial.setBounds  (280, 155, 80, 95);
}
```

### Embedding a custom font

The font embedded in JR-Granular is FuturaMedium.ttf font, which is automatically [installed](https://support.apple.com/en-us/HT212587) in macOS.

Launch Font Book application and look for Futura Medium Font.

![futura-medium.png](/images/jr-granular/futura-medium.png)

Use Finder application to show where this font is on your system. You can find the .ttc file in this way:

![find-ttc.png](/images/jr-granular/find-ttc.png)

A .ttc file is like a collection of .ttf files, and in the case of Futura.ttc, it contains the following .ttf files:

- Futura-Medium.ttf
- Futura-MediumItalic.ttf
- Futura-Bold.ttf
- Futura-CondensedMedium.ttf
- Futura-CondensedExtraBold.ttf

Since we only want to use Futura-Medium.ttf, use the tool below to break down the .ttc file into multiple .ttf files and download only the Futura-Medium.ttf.

- [Transfonter](https://transfonter.org/ttc-unpack)

![transfonter.png](/images/jr-granular/transfonter.png)

Create Resources directory, rename the downloaded Futura-Medium-01.ttf to FuturaMedium.ttf and place it under the directory.

```text:CommandLine
$ mkdir Resources
$ mv ~/Downloads/Futura-Medium-01.ttf Resources/FuturaMedium.ttf
```

After these settings, your directory structure should look something like this:

![dir-structure.png](/images/jr-granular/dir-structure.png)

Go to the CMakeLists.txt, add juce_add_binary_data function and edit target_link_libraries function:

```diff:CMakeLists.txt
+ juce_add_binary_data(BinaryData
+     SOURCES
+         Resources/FuturaMedium.ttf)

target_link_libraries("${PROJECT_NAME}"
    PRIVATE
+       BinaryData
        juce::juce_audio_utils
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags)
```

Finally, add the following code in the constructor of the plugin editor.

```c++:pluginEditor.cpp
JRGranularAudioProcessorEditor::JRGranularAudioProcessorEditor (JRGranularAudioProcessor& p,
                                                                juce::AudioProcessorValueTreeState& state,
                                                                juce::UndoManager& um)
...
{
    auto futuraMedium = juce::Typeface::createSystemTypefaceFor (BinaryData::FuturaMedium_ttf, 
                                                                 BinaryData::FuturaMedium_ttfSize);
    juce::LookAndFeel::getDefaultLookAndFeel().setDefaultSansSerifTypeface (futuraMedium);
...
}
```

### Building

All done! Build and run it on your DAW.

```text:CommandLine
$ rm -rf build
$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
$ cmake --build build --config Release
```
![finish.png](/images/jr-granular/finish.png)

## Closing
In this tutorial I have explained the following:
- how to do the RNBO C++ export
- how to include the exported code into a JUCE project
- how to connect the exported code and JUCE using [APVTS](https://docs.juce.com/master/classAudioProcessorValueTreeState.html)

If there are any typos or better ways of the implementation, please do comment. Happy Coding! 

## References
- [Using the Audio Plugin/Application Template](https://rnbo.cycling74.com/learn/using-the-audio-plugin-template)
- [Programming a Custom UI with JUCE](https://rnbo.cycling74.com/learn/programming-a-custom-ui-with-juce)
- [RNBO C++ API Reference](https://rnbo.cycling74.com/cpp)
- [Cycling74/gen-plugin-export](https://github.com/Cycling74/gen-plugin-export)
- [JUCE: Class Index](https://docs.juce.com/master/index.html)
