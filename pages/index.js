import appConfig from '../config.json'
import {Box, Button, Text, TextField, Image} from '@skynexui/components'

function GlobalStyle(){
    
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body {
                font-family: 'Open Sans', sans-serif;
            }
            /* App fit Height */ 
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */ 
        
        `}</style>


    )
}


function Title(props){

    const Tag = props.tag || 'h2';

    return (
        <>
            <GlobalStyle/>
            <Tag>Welcome back!</Tag>
            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.neutrals['#060606']};
                    font-size: 40px;
                    font-weight: 600;
                }
            
            `}</style>
        </>
         
    );
}


//Compenente react

/*function HomePage() {

    //JSX

  return (
    <div>

        <Title tag='h2'> Welcome back</Title>
        <h2>Discord -Alura Matrix</h2>
    </div>


  )
}
*/

export default function HomePage() {
  const username = 'pablovianas';

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals['C1EAC5'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', backgroundColor:'C1EAC5'
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals["#060606"], fontSize: '30px',   fontWeight: 'bold'}}>
              {appConfig.name}
            </Text>

            <TextField
                fullWidth
                onChange={function noRefCheck(){}}
                onKeyPress={function noRefCheck(){}}
                size="xs"
                styleSheet={{}}
                value=""
                variant="basicBordered"
            />
           <Button
            buttonColors={null}
            label="Entrar"
            colorVariant="dark"
            iconName="github"
            rounded="md"
            size="lg"
            type="submit"
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
              backgroundColor:'C1EAC5'
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary['black'],
                padding: '3px 10px',
                borderRadius: '1000px',
                fontSize: '30px',
                fontWeight: 'bold',
                
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
