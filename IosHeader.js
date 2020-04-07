import * as React from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function isIphoneX() {
  const dimension = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimension.height === 812 || dimension.width === 812) || (dimension.height === 896 || dimension.width === 896))
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

const HEADER_SCROLL_DISTANCE = 91;
const HEADER_SCROLL_DISTANCE_MAX = 73;
const SEARCH_BAR_DISTANCE = 55;

type Props = {
  style?: any;
  title?: string;
  topLeftItem?: () => React.Component;
  topRightItem?: () => React.Component;
  botRightItem?: () => React.Component;
  fontColor?: string;
  noBorder?: boolean;
};

export default class IosHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      refreshing: false,
      scrollY: new Animated.Value(0),
    }
  }

  updateSearch(search) {
    this.setState({ search: search });
  }

  transformHeader() {
    return {
      transform: [{
        translateY: this.state.scrollY.interpolate({
            inputRange: [0, SEARCH_BAR_DISTANCE],
            outputRange: [0, SEARCH_BAR_DISTANCE],
            extrapolate: 'clamp',
          })
      }]
    }
  }

  //currently not using
  transformSearchBar() {
    return {
      transform: [{
        translateY: this.state.scrollY.interpolate({
            inputRange: [0, SEARCH_BAR_DISTANCE],
            outputRange: [0, SEARCH_BAR_DISTANCE],
            extrapolate: 'clamp',
          })
      }]
    }
  }

  render() {
    const { search } = this.state;
    const title = this.props.title;
    const style = this.props.style;
    const fontColor = this.props.fontColor;
    const headerHeight = this.props.headerHeight ? this.props.headerHeight : 44;
    const topLeftItem = this.props.topLeftItem;
    const topRightItem = this.props.topRightItem;
    const botRightItem = this.props.botRightItem;

    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 5, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    const headerBorder = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 5, HEADER_SCROLL_DISTANCE],
      outputRange: [0,0,1],
      extrapolate: 'clamp',
    });

    const searchBarOpacity = this.state.scrollY.interpolate({
      inputRange: [0, SEARCH_BAR_DISTANCE],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
    <Animated.View style={[styles.container]}>

        <Animated.View style={[styles.header, {height: headerHeight, borderBottomWidth: headerBorder}]}>
           <View style={{flex:1, alignSelf:'flex-start', flexDirection:'row'}}>
             { topLeftItem }
           </View>
           <View style={{flex:1,alignSelf:'center',justifyContent:'center'}}>
             <Animated.Text style={{fontSize:20,fontWeight:'600',alignSelf:'center',opacity: titleOpacity }}>
               { title }
             </Animated.Text>
           </View>
           <View style={{flex:1}}>
             { topRightItem }
           </View>
         </Animated.View>

       <Animated.ScrollView
         bounces={true}
         style={{backgroundColor:'transparent'}}
         scrollEventThrottle={16}
         onScroll={Animated.event(
           [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
         )}
       >
         <Animated.View style={[styles.mainHeader, this.transformHeader()]}>
           <View style={{paddingHorizontal:20,backgroundColor:'#fff'}}>
             <Text style={{fontSize:36,fontWeight:'bold',alignSelf:'flex-start'}}>{ title }</Text>
           </View>
         </Animated.View>
         <Animated.View style={[styles.searchBarCell,  {opacity: searchBarOpacity}]}>
           <SearchBar
              platform="ios"
              placeholder='Search'
              onChangeText={this.updateSearch}
              value={search}
              containerStyle={{backgroundColor:'#fff',paddingTop:5}}
              inputContainerStyle={{backgroundColor:'#eee', height:37}}
            />
          </Animated.View>
          <View style={{borderTopColor:'#eee', borderTopWidth:1, zIndex:2}}>
            { this.props.content }
          </View>
       </Animated.ScrollView>
     </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainHeader: {
    flex: 1,
    zIndex: 100,
  },
  header: {
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal: 20,
    borderBottomColor:'#eee',
    ...ifIphoneX({
           marginTop: 50,
       }, {
           marginTop: 20,
       })
  },
  searchBarCell: {
    zIndex: 1,
    backgroundColor:'red',
    marginHorizontal:10,
  }
})
