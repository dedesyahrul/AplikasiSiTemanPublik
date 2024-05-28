import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import OurTeamSection from './OurTeamSection';
import Banner from './Banner';
import Colors from '../../../utils/Colors';
import Heading from '../../Components/Heading';
import Description from './Description';

export default function Abouts() {
  return (
    <ScrollView style={styles.container}>
      <Banner />
      <View>
        <OurTeamSection />
      </View>
      <View
        style={{
          borderWidth: 0.4,
          borderColor: Colors.secondary,
          marginTop: 10,
          marginBottom: 10,
          marginRight: 30,
          marginLeft: 30,
        }}
      />
      <View style={{padding: 20}}>
        <Heading text={'About'} />
        <View>
          <Description />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
