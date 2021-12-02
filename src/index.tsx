import React from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  ViewabilityConfigCallbackPairs,
  TouchableOpacity
} from 'react-native';

type TabComponentType = {
  title: string;
  data: any;
}

type tabOptionsType = {
  tabStyle?: any;
  visableTitle?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

type Props = {
  TestName?: string;
  TabBar?: any;
  TabComponent: Array<TabComponentType>;
  RenderContent: any;
 
  contentStyle?: {};
  tabOptions?: tabOptionsType;
}

interface StateTypes {
  translateX: any;
}

const ITEM_WIDTH = Dimensions.get('window').width;

export class Test extends React.Component<Props,StateTypes> {
  flatList_Ref: any;
  viewableItemsRef: any;
  onLayout: any;
  viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs;
  scrollIndex: number;
  TabComponent: any
  
  constructor(props: any) {
    super(props);
    this.viewableItemsRef = null;
    this.onLayout = null;
    this.scrollIndex = 0
    this.viewabilityConfigCallbackPairs = [
      {
        viewabilityConfig: {
            minimumViewTime: 150,
            itemVisiblePercentThreshold: 100
        },
        onViewableItemsChanged: this.onViewableItemsChanged
      },
      {
        viewabilityConfig: {
            minimumViewTime: 150,
            itemVisiblePercentThreshold: 90
        },
        onViewableItemsChanged: this.onViewableItemsChanged
      }
    ];

    this.state = {
      translateX: new Animated.Value(0),
    }
  
  }

  onViewableItemsChanged = (info: any) => {
    if (info.viewableItems && info.viewableItems.length > 0) {
        this.scrollIndex = info.viewableItems[0]['index'];
        this.setState({});
    } 
  }

  selectedIndex(selectedIndex: any) {
    this.flatList_Ref.scrollToIndex({ animated: true, index: selectedIndex});
    Animated.spring(this.state.translateX,{
        toValue: selectedIndex * this.onLayout.width,
        useNativeDriver: false,
        damping: 15
    }).start();
  }

  getItemLayout = (_: any, index: any) => {
    return {
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
    };
  };

  renderItem = (props: any) => {
    const {RenderContent} = this.props;
    return <View key={props.index} style={{width: ITEM_WIDTH}}>
        {RenderContent(props)}
    </View>
  }
   
  render() {
    const {TabBar,TabComponent,tabOptions} = this.props;
    return <View style={{ flex: 1}}>
        <View style={[{height: 60,flexDirection:"row",position: "relative"},tabOptions?.tabStyle]}>
            {
              TabComponent.map((item: any,index: number) =>
                <TouchableOpacity
                  key={index}
                  onLayout={(event: any)  => this.onLayout = event.nativeEvent.layout}
                  style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}
                  onPress={() => this.selectedIndex(index)}>
                  {
                    TabBar ? <TabBar item={item} focused={index === this.scrollIndex ? true : false}/> 
                    : 
                    <Text style={{color: index === this.scrollIndex ? "pink" : "#310438"}}>{item.title}</Text>     
                  }
                </TouchableOpacity>
              )
            }
        </View>
        <View style={{flex: 1}}>
          <FlatList
            ref={ref => this.flatList_Ref = ref}
            initialScrollIndex={0.01}
            viewabilityConfigCallbackPairs={this.viewabilityConfigCallbackPairs}
            getItemLayout={this.getItemLayout}
            horizontal={true}
            keyExtractor={( _: any,index:any) => index.toString()}
            data={TabComponent}
            pagingEnabled={true}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
            extraData={this.props}
          />
        </View>
       
    </View>
  }
}

