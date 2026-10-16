/**
 * react-native-gesture-handler: on iOS, content mounted into a button after its
 * first render ends up *behind* its siblings, so the button looks blank.
 *
 * The content is swapped automatically at 3 s and back at 6 s; "Toggle" swaps it
 * again. Every RNGH row should match the plain `View` row (control). On iOS the
 * RNGH rows go blank.
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BaseButton,
  GestureHandlerRootView,
  RectButton,
  Touchable,
} from 'react-native-gesture-handler';

// A View with only a background is flattened by Fabric: its children are
// mounted into the button itself, right after this View.
function Content({ loading }: { loading: boolean }) {
  return (
    <View style={styles.frame}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.label}>Label</Text>
      )}
    </View>
  );
}

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setLoading(true), 3000);
    const b = setTimeout(() => setLoading(false), 6000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        style={styles.toggle}
        onPress={() => setLoading(value => !value)}
      >
        <Text>Toggle (loading: {String(loading)})</Text>
      </Pressable>

      <Text style={styles.caption}>BaseButton</Text>
      <BaseButton onPress={() => {}}>
        <Content loading={loading} />
      </BaseButton>

      <Text style={styles.caption}>Touchable</Text>
      <Touchable onPress={() => {}}>
        <Content loading={loading} />
      </Touchable>

      <Text style={styles.caption}>RectButton</Text>
      <RectButton onPress={() => {}}>
        <Content loading={loading} />
      </RectButton>

      <Text style={styles.caption}>View (control)</Text>
      <View>
        <Content loading={loading} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 80, gap: 8 },
  toggle: {
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  caption: { marginTop: 8 },
  frame: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#7E58FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: 'white', fontWeight: '600' },
});

export default App;
