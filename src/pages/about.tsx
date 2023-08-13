import type { NextPage } from 'next'
import { IDKitWidget } from '@worldcoin/idkit'
import { useState } from 'react'
import { Heading, Flex, Text, Button } from '@chakra-ui/react' // <-- Import Button
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Box, Image } from '@chakra-ui/react';

const EventCard = ({ title, imageUrl, onVerify }: { title: string, imageUrl: string, onVerify: () => void }) => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m={3}>
        <Image src={imageUrl} alt={title} />

        <Box p="6">
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                {title}
            </Box>

            <Button mt={4} colorScheme="teal" onClick={onVerify}>
                Verify Attendance
            </Button>
        </Box>
    </Box>
);

const About: NextPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <Flex
            direction="column"
            width="100%"
            height="90vh" // <-- Use viewport height for full height coverage
            alignItems="center"
            justifyContent="center" // <-- Center the content vertically
            padding="2rem"
        >
            <Heading mb={4}>Events</Heading>

            <IDKitWidget
                app_id=""
                action="vote_1"
                onSuccess={(result: any) => {
                    console.log(result)
                    setIsLoggedIn(true)
                }}
                credential_types={['orb', 'phone']}
                enableTelemetry
            >
                {({ open }) => (
                    <>
                        {!isLoggedIn ? (
                            <Button colorScheme="teal" onClick={open}>
                                Verify with World ID
                            </Button>
                        ) : (
                            <Flex align="center">
                                {/* List of EventCards */}
                                <EventCard
                                    title="Event 1"
                                    imageUrl="https://pbs.twimg.com/media/F2ET5CSWIAAGr2M?format=jpg&name=medium"
                                    onVerify={() => { console.log("Verified attendance for Event 1") }}
                                />
                                <EventCard
                                    title="Event 2"
                                    imageUrl="https://pbs.twimg.com/media/FpA0u8GacAEpxT_?format=jpg&name=medium"
                                    onVerify={() => { console.log("Verified attendance for Event 2") }}
                                />
                                <EventCard
                                    title="Event 3"
                                    imageUrl="https://pbs.twimg.com/media/F2ypWuTbwAA5oLp?format=jpg&name=medium"
                                    onVerify={() => { console.log("Verified attendance for Event 3") }}
                                />
                            </Flex>

                        )}
                    </>
                )}
            </IDKitWidget>
        </Flex>
    )
}

export default About
