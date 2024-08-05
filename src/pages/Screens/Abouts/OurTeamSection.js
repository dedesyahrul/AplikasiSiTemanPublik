import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Heading from '../../Components/Heading';
import Colors from '../../../utils/Colors';

const TeamMember = ({name, role, image}) => {
  return (
    <View style={styles.memberContainer}>
      <View style={styles.memberImageContainer}>
        <Image source={image} style={styles.memberImage} />
      </View>
      <Text style={styles.memberName} allowFontScaling={false}>
        {name}
      </Text>
      <Text style={styles.memberRole} allowFontScaling={false}>
        {role}
      </Text>
    </View>
  );
};

const OurTeam = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} allowFontScaling={false}>
        Our Team
      </Text>
      <View style={styles.teamContainer}>
        <TeamMember
          name="Romy Heriyanto"
          role="Proficient Programmer"
          image={require('../../../assets/images/team/romy.jpg')}
        />
        <TeamMember
          name="Dede Syahrul M"
          role="Proficient Programmer"
          image={require('../../../assets/images/team/dede.jpg')}
        />
        <TeamMember
          name="Ahmad Fayyadh"
          role="Proficient Programmer"
          image={require('../../../assets/images/team/fayyadh.jpg')}
        />
        {/* Add more TeamMembers as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Outfit-Bold',
    color: Colors.primary,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  memberContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  memberImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'gray', // Change the color as needed
    marginBottom: 10,
  },
  memberImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  memberName: {
    fontSize: 12,
    fontFamily: 'Outfit-Bold',
  },
  memberRole: {
    color: '#777',
    fontSize: 10,
    fontFamily: 'Outfit-Regular',
  },
});

export default OurTeam;
