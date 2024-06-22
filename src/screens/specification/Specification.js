import {Text, View, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/timeicon.png';
import starIcon from '../../../assets/images/staricon.png';
import processorIcon from '../../../assets/images/Processor.png';
import videocardIcon from '../../../assets/images/VideoCard.png';
import monitorIcon from '../../../assets/images/Monitor.png';
import keyboardIcon from '../../../assets/images/Keyboard.png';
import mouseIcon from '../../../assets/images/Mouse.png';
import headphoneIcon from '../../../assets/images/Headphones.png';
import axios from 'axios';
import ip from '../../../ip';

export class Specification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specifications: null,
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const {route} = this.props;
    const {icafe_detail_id} = route.params;

    try {
      const response = await axios.get(
        `${ip}/icafepage/getComputerSpecifications`,
        {
          params: {icafe_detail_id},
        },
      );
      const specifications = response.data;
      this.setState({specifications, loading: false});
      console.log(specifications);
    } catch (error) {
      this.setState({error: 'Error fetching data', loading: false});
      console.error('Error fetching data:', error);
    }
  }
  render() {
    const {route} = this.props;
    const {data, classType} = route.params;
    const {specifications, loading, error} = this.state;
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <View style={style.container}>
        <View style={style.imageCardContainer}>
          <Image source={imageIcafePage} style={style.imageIcafePage} />
          <View style={style.overlay} />
          <View style={style.textOverlay}>
            <Text style={style.textTitle}>{data.name}</Text>
            <View style={style.iconsContainer}>
              <View style={style.iconContainer}>
                <Image source={workHoursIcon} style={style.icon} />
                <Text style={style.iconText}>
                  {data.open_time} - {data.close_time}
                </Text>
              </View>
              <View style={style.iconContainer}>
                <Image source={starIcon} style={style.icon} />
                <Text style={style.iconText}>{data.rating}</Text>
              </View>
            </View>
            <Text style={style.textDescription}>{data.address}</Text>
          </View>
        </View>
        <View style={style.contentContainer}>
          <View
            style={
              (style.classContainer, this.getPriceContainerStyle(classType))
            }>
            <Text style={style.classText}>{classType} Class</Text>
          </View>
          <View style={style.descriptionContainer}>
            <Text style={style.descriptionText}>
              {specifications.description}
            </Text>
          </View>
          <View style={style.computerSpecContainer}>
            <Text style={style.computerSpecText}>Computer Specifications</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={processorIcon} style={style.specIcon} />
            <Text style={style.rowText}>{specifications.processor}</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={videocardIcon} style={style.specIcon} />
            <Text style={style.rowText}>{specifications.vga}</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={monitorIcon} style={style.specIcon} />
            <Text style={style.rowText}>{specifications.monitor}</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={keyboardIcon} style={style.specIcon} />
            <Text style={style.rowText}>HyperX Alloy Origins</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={mouseIcon} style={style.specIcon} />
            <Text style={style.rowText}>{specifications.mouse}</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={headphoneIcon} style={style.specIcon} />
            <Text style={style.rowText}>{specifications.headset}</Text>
          </View>
        </View>
      </View>
    );
  }
  getPriceContainerStyle = classType => {
    switch (classType) {
      case 'VVIP':
        return style.vvipContainer;
      case 'VIP':
        return style.vipContainer;
      case 'Regular':
        return style.regularContainer;
      default:
        return style.regularContainer;
    }
  };
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072B',
  },
  imageCardContainer: {
    width: '100%',
    height: 231,
    justifyContent: 'center',
  },
  imageIcafePage: {
    width: '100%',
    height: 230,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  textOverlay: {
    position: 'absolute',
    width: '90%',
    marginLeft: '5%',
  },
  textTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  textDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  contentContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'rgba(197, 156, 12, 0.15)',
    borderColor: '#C59C0C',
    borderWidth: 3,
    width: '35%',
    borderRadius: 10,
  },
  classText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: '700',
  },
  vvipContainer: {
    backgroundColor: 'rgba(126, 101, 22, 0.15)',
    borderWidth: 3,
    borderColor: '#AA8608',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  vipContainer: {
    backgroundColor: 'rgba(11, 90, 118, 0.15)',
    borderWidth: 3,
    borderColor: '#277CC6',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  regularContainer: {
    backgroundColor: 'rgba(97, 94, 98, 0.15)',
    borderWidth: 3,
    borderColor: '#C3BBBB',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 15,
  },
  descriptionText: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'justify',
  },
  computerSpecContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 5,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  computerSpecText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  rowContainer: {
    width: '80%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    marginVertical: 2,
  },
  specIcon: {
    width: 20,
    height: 20,
  },
  rowText: {
    color: '#FFFFFF',
    marginHorizontal: 20,
  },
});

export default Specification;
