import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  ActivityIndicator,
  ImageBackground
} from 'react-native';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      isLoading: nextProps.isLoading
    };
  }

  render() {
    return (
        <ImageBackground source={require('../src/images/fondo.jpg')} style={{width: '100%', height: '100%'}}>     
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.state.isLoading}
                style={{ zIndex: 1100 }}
                onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    {/* <ActivityIndicator animating={this.state.loading} color="#00ff00" /> */}

                    {/* If you want to image set source here */}
                    <Image
                    source={require('../src/images/cargando.gif')}
                    style={{ height: 80, width: 80 }}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </View>
                </View>
            </Modal>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader