import TabQrCode from '@/components/TabQrCode';
import { storeAuth } from '@/lib/logicAuth';

import { BarChart2, CircleUserRound, Home, MapPinned } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { Redirect, Tabs, usePathname } from 'expo-router';

export default function HomeLayout() {
  const token = storeAuth((s) => s.token);

  if (!token) return <Redirect href={'/(auth)'} />;

  const iconSize = 1.4;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: 'black',

        // styles
        tabBarItemStyle: {
          marginTop: 5,
          height: 50,
        },
        tabBarStyle: {
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'paiaFeliz',
        },
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Inicio',
          tabBarIcon({ size, color }) {
            return <Home color={color} size={size * iconSize} />;
          },
        }}
      />
      <Tabs.Screen
        name='(mapa)'
        options={{
          title: 'Mapa',
          tabBarIcon({ size, color }) {
            return <MapPinned color={color} size={size * iconSize} />;
          },
        }}
      />
      <Tabs.Screen
        name='(qrCode)'
        options={{
          tabBarButton: () => (
            <TabQrCode href='/(app)/(qrCode)' elevacao={0.54} size={21 * iconSize} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name='(ranking)'
        options={{
          title: 'Rank',
          tabBarIcon({ size, color, focused }) {
            return <BarChart2 strokeWidth={5} color={color} size={size * iconSize} />;
          },
        }}
      />
      <Tabs.Screen
        name='(profile)'
        options={{
          title: 'Minha Conta',
          tabBarIcon({ size, color }) {
            return <CircleUserRound color={color} size={size * iconSize} />;
          },
        }}
      />
      <Tabs.Screen
        name='(home)/[infoUrl]'
        options={{
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name='(qrCode)/[infoUrl]'
        options={{
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
    </Tabs>
  );
}
