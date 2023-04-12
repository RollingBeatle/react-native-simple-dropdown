import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Animated,
  ScrollView,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"

const simpleDropDown = () => {

  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(({options, prompt}) => {
    // This effect runs after the first render
    const defaultValue = options?.find((item) => item.value === selectedValue);
    setSelectedItem(defaultValue?.label);
  }, []);

  const handlePress = (item) => {
    setOpen(false);
    setSelectedItem(item.label);
    onValueChange(item.value);
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen(!open)}
      >
        <Text style={[styles.headerText, textStyle]}>
          {selectedItem || prompt}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <MaterialIcons name="chevron-down" size={24} color={colors.brown} />
        </Animated.View>
      </TouchableOpacity>
      {open && (
        <View style={styles.viewItems}>
          <ScrollView style={styles.items} nestedScrollEnabled={true}>
            {options?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

}

export default simpleDropDown