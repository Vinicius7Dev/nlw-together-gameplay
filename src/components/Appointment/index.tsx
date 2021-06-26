import React from 'react';
import { View, Text } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import GuildIcon from '../GuildIcon';
import { GuildProps } from '../Guild';
import categories from '../../utils/categories';
import theme from '../../global/styles/theme';

export interface AppointmentData {
    id: string,
    guild: GuildProps,
    category: string,
    date: string,
    description: string,
}

interface AppointmentProps extends RectButtonProps {
    data: AppointmentData;
}

const Appointment: React.FC<AppointmentProps> = ({
    data,
    ...rest
}) => {
    const [category] = categories.filter(item => item.id === data.category);
    const { owner } = data.guild;
    const { primary, on, secondary50, secondary70 } = theme.colors;

    return (
        <RectButton {...rest}>
            <View style={styles.container} >
                <LinearGradient
                    style={styles.guildIconContainer}
                    colors={[secondary50, secondary70]}
                >
                    <GuildIcon
                        guildId={data.guild.id}
                        iconId={data.guild.icon}
                    />
                </LinearGradient>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{ data.guild.name }</Text>
                        <Text style={styles.category}>{ category.title }</Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <CalendarSvg />

                            <Text style={styles.date}>
                                { data.date }
                            </Text>
                        </View>

                        <View style={styles.playersInfo}>
                            <PlayerSvg fill={owner ? primary : on}/>
                        
                            <Text style={[
                                styles.player,
                                { color: owner ? primary : on }
                            ]}>
                                {owner ? 'Anfitrião' : 'Visitante'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </RectButton>
    );
}

export default Appointment;