import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import theme from '../../global/styles/theme';
import styles from './styles';

import Guilds from '../Guilds';
import GuildIcon from '../../components/GuildIcon';
import { GuildProps } from '../../components/Guild';
import ModalView from '../../components/ModalView';
import Header from '../../components/Header';
import CategorySelect from '../../components/CategorySelect';
import SmallInput from '../../components/SmallInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';

const AppointmentCreate: React.FC = () => {
    const [categorySelected, setCategorySelected] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
    
    const handleOpenGuildsModal = useCallback(() => {
        setOpenGuildsModal(true);
    }, [openGuildsModal]);
    
    const handleGuildSelected = useCallback((guildSelected: GuildProps) => {
        setGuild(guildSelected);
        setOpenGuildsModal(false);
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={
                Platform.OS === 'ios' ? 'padding' : 'height'
            }
            style={styles.container}
        >
            <ScrollView>
                <Header title="Agendar partida" />

                <Text style={[
                    styles.label,
                    { marginLeft: 24, marginTop: 36, marginBottom: 18 },
                ]}>
                    Categoria
                </Text>

                <CategorySelect
                    categorySelected={categorySelected}
                    setCategorySelected={setCategorySelected}
                    hasCheckBox
                />

                <View style={styles.form}>
                    <RectButton onPress={handleOpenGuildsModal}>
                        <View style={styles.select}>
                            {
                                guild.id
                                    ? <GuildIcon urlImage={guild.icon} />
                                    : <View style={styles.image} />
                            }

                            <View style={styles.selectBody}>
                                <Text style={styles.label}>
                                    {
                                        guild.name
                                            ? guild.name
                                            : 'Selecione um servidor'
                                    }
                                </Text>
                            </View>

                            <Feather
                                name="chevron-right"
                                color={theme.colors.heading}
                                size={18}
                            />
                        </View>
                    </RectButton>

                    <View style={styles.field}>
                        <View>
                            <Text style={styles.label}>
                                Dia e mês
                            </Text>
                            
                            <View style={styles.column}>
                                <SmallInput maxLength={2} />
                                <Text style={styles.divider}>
                                    /
                                </Text>
                                <SmallInput maxLength={2} />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.label}>
                                Hora e minuto
                            </Text>
                            
                            <View style={styles.column}>
                                <SmallInput maxLength={2} />
                                <Text style={styles.divider}>
                                    :
                                </Text>
                                <SmallInput maxLength={2} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.field, { marginBottom: 12 }]}>
                        <Text style={styles.label}>
                            Descrição
                        </Text>

                        <Text style={styles.caracteresLimit}>
                            Max 100 caracteres
                        </Text>
                    </View>

                    <TextArea
                        multiline
                        maxLength={100}
                        numberOfLines={5}
                        autoCorrect={false}
                    />

                    <View style={styles.footer}>
                        <Button title="Agendar"/> 
                    </View>
                </View>
            </ScrollView>
            <ModalView visible={openGuildsModal}>
                <Guilds handleGuildSelected={handleGuildSelected} />
            </ModalView>
        </KeyboardAvoidingView>
    );
}

export default AppointmentCreate;