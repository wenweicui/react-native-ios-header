
[![Version](https://img.shields.io/npm/v/react-native-animated-header.svg)](https://www.npmjs.com/package/react-native-animated-header)
[![NPM](https://img.shields.io/npm/dm/react-native-animated-header.svg)](https://www.npmjs.com/package/react-native-animated-header)


# react-native-ios-header

iOS Style React Native Animated Header

## Installation

```bash
npm install --save react-native-ios-header
```

## Demo

![demo](/ios-header.gif)

## Usage

```javascript
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import IosHeader from 'react-native-ios-header';

export default class App extends Component {

  render() {
    const addIcon = (
      <TouchableOpacity>
       <Text style={{color:'#000', fontSize:32,alignSelf:"flex-end"}}>+</Text>
      </TouchableOpacity>
    )
    return (
      <View style={styles.container}>
        <IosHeader title='Favorite' content={timeLine} topRightItem={addIcon}/>
      </View>
    );
  }
}

```

## Props

| Prop                                | Type     | Default   | description |
| ----------------------------------- | -------- | ----------| ----------- |
| title                               | string   | `Title`   | Custom header title for both place |
| content                             | function | None      | Custom body content |
| headerBgColor                       | string   | `#fff`    | Custom header background color |
| inputColor                          | string   | `#7d7d7d` | Search text input color |
| inputBgColor                        | string   | `#dcdce1` | Search text input background color |
| placeholderColor                    | string   | `#dcdce1` | Text input placeholder color |
| iconColor                           | string   | `#7d7d7d` | SearchHeader component icon button color |
| topOffset                           | number   | 50 / 20   | The offset above the header. Default to 50 (ios Iphone X and Above) else 20 |
| placeholder                         | string   | `Search`  | A string placeholder when there is no text in text input |
| topLeftItem                         | function | None      | Component for top left side |
| topRightItem                        | function | None      | Component for top right side |
| botRightItem                        | function | None      | Right side component beside Large Title |
| onClear                             | function | None      | This function is called when text input is cleared |
| onSearch                            | function | None      | This function is called after return/done key is pressed. Return text input event |
| onEnteringSearch                    | function | None      | This function is called after text is entered/changed in text input. Return text input event |
| onFocus                             | function | None      | This function is called when text input in focused |


## Copyright and License

MIT License

Copyright (c) 2020 wenweicui
