import type { NextPage } from 'next'
import { IDKitWidget } from '@worldcoin/idkit'
import { useState } from 'react' // <-- Import useState
import { Heading, Flex, Text } from '@chakra-ui/layout'

const About: NextPage = () => {
    // Add the isLoggedIn state
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <Flex
            direction="row"
            width="100%"
            height="90%"
            alignItems="center"
            justifyContent="space-between"
            padding="2rem"
        >
            <Flex
                width="66%"
                height="100%"
                direction="column"
                justifyContent="space-between"
                gap="3rem"
            >
                <Heading>Events</Heading>

                <IDKitWidget
                    app_id=""
                    action="vote_1"
                    // Update the onSuccess callback to set isLoggedIn to true
                    onSuccess={(result: any) => {
                        console.log(result)
                        setIsLoggedIn(true)
                    }}
                    credential_types={['orb', 'phone']}
                    enableTelemetry
                >
                    {({ open }) => (
                        <>
                            {/* Conditionally render the button and the text based on the isLoggedIn state */}
                            {!isLoggedIn ? (
                                <button onClick={open}>Verify with World ID</button>
                            ) : (
                                <Text>Logged in</Text>
                            )}
                        </>
                    )}
                </IDKitWidget>
            </Flex>
        </Flex>
    )
}

export default About
