import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router' //react hooks
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM3ODA5NywiZXhwIjoxOTU4OTU0MDk3fQ.OZyBU2zhYAL6ZcXWYD3lLVTxKS2vQO8WHnO731jomDk'
const SUPABASE_URL = 'https://dwghgzffnsulnbnxtogo.supabase.co'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabase
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabase
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem:', novaMensagem);
            console.log('listaDeMensagens:', listaDeMensagens);
            // Quero reusar um valor de referencia (objeto/array) 
            // Passar uma função pro setState

            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens
            // ])
            setListaDeMensagens((valorAtualDaLista) => {
                console.log('valorAtualDaLista:', valorAtualDaLista);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabase
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {

            })


        setMensagem('');
    }




    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{

                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals['C1EAC5'],
                    height: '85%',
                    maxWidth: '70%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        overflow: 'auto',
                        overflowX: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals['C1EAC5'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[800],
                            }}
                        />
                        <Button
                            onClick={(event) => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}
                            colorVariant="dark"
                            iconName="arrowRight"
                            variant="primary"
                            styleSheet={{
                                marginBottom: '10px',
                                marginRight: '10px'
                            }}
                            rounded='lg'
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}

                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: appConfig.theme.colors.primary['black'], fontWeight: 'bold', fontSize: '100px' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    styleSheet={{
                        color: appConfig.theme.colors.primary['black'],
                        fontWeight: 'bold',
                        fontSize: '50px'
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    return (
        <Box
            tag="ul"
            styleSheet={{
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.primary["black"],
                fontWeight: 'bolder',
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            border: '1px solid',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals['transparent'],
                            }
                        }}

                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals['black'],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>


                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')}
                                    styleSheet={{
                                        width: '70px',
                                        height: '70px'

                                    }}
                                />
                            )
                            : (
                                mensagem.texto
                            )


                        }

                    </Text>
                );
            })}
        </Box>
    )
}