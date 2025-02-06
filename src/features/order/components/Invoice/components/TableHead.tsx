import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, ReactElement } from 'react';



const styles = StyleSheet.create({
  tHeader: {
    marginTop: 20,
    fontSize: 10,
    fontFamily: 'Lato Bold',
    fontWeight: 'bold',
    paddingTop: 4,
    textAlign: 'center',
    flex: 1,
    height: 20,
    borderBottomWidth: 1
  },
  tHeader2: { flex: 2, textAlign: 'left', borderRightWidth: 0, borderBottomWidth: 1 }
});


const TableHead:FC = ():ReactElement => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
    <View style={[styles.tHeader, styles.tHeader2]}>
      <Text>Service</Text>
    </View>
    <View style={styles.tHeader}></View>
    <View style={styles.tHeader}></View>
    <View style={styles.tHeader}></View>
    <View style={styles.tHeader}></View>
    <View style={styles.tHeader}>
      <Text>Qty</Text>
    </View>
    <View style={styles.tHeader}>
      <Text>Price($)</Text>
    </View>
    <View style={styles.tHeader}>
      <Text>Total($)</Text>
    </View>
  </View>
  )
}
export default TableHead