import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
      container: {
       // backgroundColor:'',
      },
});


class ProgressiveImage extends React.Component {
  render() {

      const {
          thumbnailSource,
      source,
      style,
      blur,
      ...props
  } = this.props;

    return (

           <View style={styles.container}>
            <Image
                {...props}
                source={thumbnailSource}
                style={style}
                blurRadius={blur}
            />
            <Image
                {...props}
                source={source}
                style={[styles.imageOverlay, style]}
                blurRadius={blur}
            />
        </View>)

  }
}
export default ProgressiveImage;