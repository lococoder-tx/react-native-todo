import { Text, Image } from 'react-native'
import { styles } from './Header.style'
import logoImg from '../../assets/logo.png'

export function Header() {
  return (
    <>
      <Image resizeMode="contain" style={styles.img} source={logoImg} />
      <Text style={styles.subtitle}>You probably have something to do</Text>
    </>
  )
}
