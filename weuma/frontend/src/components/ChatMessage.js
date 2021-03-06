import * as React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  Box,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react';

export default function Message(props){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [message, setMessage] = React.useState(props.message)
    const [ticket, setTicket] = React.useState({
      email: '',
      category: '',
      title: message,
      message: '',
      adminId: '',
      response: ''
    });
    const [faq, setFaq] = React.useState({
        question: '',
        answer: message,
        category: '',
        pinned: false
    });

    const [edit, setEdit] = React.useState(message)
    
    const handleSubmit = async () => {
      try {

        await fetch(`http://localhost:8080/api/ticket-submit`, {
          method: 'POST',
          body: JSON.stringify(ticket),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(() => {
            props.socket.emit('send_ticket')
        })
        .catch((e) => {
          console.log('Fetching error: ', e);
        })

      } catch (error) {
        console.log(error);
      }
    }

    const handleFaqSubmit = async () => {
        try {

            await fetch(`http://localhost:8080/api/message-faq-submit`, {
                method: 'POST',
                body: JSON.stringify(faq),
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(() => {
                console.log('Faq submitted')
            })
            .catch((e) => {
                console.log('Fetching error: ', e);
            })
    

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
      setTicket({
        ...ticket,
        [e.target.name]: e.target.value
      });
    }

    const handleFaqChange = (e) => {
        setFaq({
            ...faq,
            [e.target.name]: e.target.value
        });
    }

    const handleEditChange = (e) => {
        setEdit(e.target.value);
    }

    const handleReset = () => {
        setTicket({
            email: '',
            category: '',
            title: message,
            message: '',
            adminId: '',
            response: ''
        });
    }

    const handleImage = () => {
            try {
                if(props.isImage){
                    const img = require(`../../../server/src/public/${props.message}`);
                    return <Image src={img} boxSize='200px' />
                }else{
                    return <Text color='brand.accent'>{props.message}</Text>
                }
            } catch (error) {
                    return <Text color='brand.accent'>{props.message}</Text>
            }
        }

    if(props.received){
        return(
        <>
            <Flex flexDirection='row' maxW='1000px'>
                <Image src={props.userImage} boxSize='50px' borderRadius='full' />
                <Box shadow={'md'} bg='brand.secondary' mx='20px' p='5px' borderRadius='10px' cursor={'pointer'} onClick={onOpen}>
                    {handleImage()}
                </Box>
            </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose an Action</ModalHeader>
            <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={'18px'}>Message Title:</Text>
                    <Text pl={'10px'} pt={'5px'}>{message}</Text>

                    <FormControl mt={4}>
                        <FormLabel>Select a Category</FormLabel>
                    <Select value={ticket.category} onChange={handleChange} name='category' id='category' placeholder='Select category...' color={'gray'}>
                        <option>Admission</option>
                        <option>Education</option>
                        <option>Resources</option>
                        <option>Documents</option>
                        <option>Guide</option>
                        <option>Payments</option>
                        <option>Lost & Found</option>
                        <option>Support Tickets</option>
                        <option>Transport</option>
                        <option>Shop & Merch</option>
                    </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Question Description: </FormLabel>
                        <Input onChange={handleChange} value={ticket.message} name='message' id='message' placeholder='Description...' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email: </FormLabel>
                        <Input value={ticket.email} onChange={handleChange} name='email' id='email' placeholder='1110000@student.uma.pt...' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => {onClose(); handleSubmit();}} colorScheme='blue' mr={3}>
                        Send Ticket
                    </Button>
                    <Button display={props.role === 'admin' ? 'initial' : 'none'} colorScheme='red' mr={3} onClick={() => {props.handleDelete(props.msgId); onClose();}}>
                        Delete Message
                    </Button>
                    <Button variant='ghost' onClick={() => {onClose(); handleReset();}}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
        )
    }else{

        return(
            <>
            <Flex justifyContent='end' flexDirection='row' w='100%'>
                <Box shadow={'md'} bg='brand.extra' mx='20px' p='5px' borderRadius='10px' cursor={'pointer'} onClick={onOpen}>
                    {handleImage()}
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={'18px'}>Message Title:</Text>
                    <Text pl={'10px'}>{message}</Text>

                    <FormControl mt={4}>
                        <FormLabel >Select a Category</FormLabel>
                    <Select value={ticket.category} onChange={handleChange} name='category' id='category' placeholder='Select category...' color={'gray'}>
                        <option>Admission</option>
                        <option>Education</option>
                        <option>Resources</option>
                        <option>Documents</option>
                        <option>Guide</option>
                        <option>Payments</option>
                        <option>Lost & Found</option>
                        <option>Support Tickets</option>
                        <option>Transport</option>
                        <option>Shop & Merch</option>
                    </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Question Description: </FormLabel>
                        <Input value={ticket.message} onChange={handleChange} name={"message"} placeholder='Description...' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email: </FormLabel>
                        <Input value={ticket.email} onChange={handleChange} name={"email"} placeholder='1110000@student.uma.pt...' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel pt='10px' borderTop={'1px solid gray'}>Edit: </FormLabel>
                        <Input value={edit} onChange={handleEditChange} placeholder='Edit your message...' />
                    </FormControl>


                    <FormControl mt={4}>
                        <FormLabel borderTop={'1px solid gray'}>Create a FAQ: </FormLabel>
                        <FormLabel pt='5px' >Question: </FormLabel>
                        <Input value={faq.question} name={'question'} onChange={handleFaqChange} placeholder='Write a question...' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel pt='5px'>Answer: </FormLabel>
                        <Input value={faq.answer} name={'answer'} onChange={handleFaqChange} placeholder='Write an answer...' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Select a Category</FormLabel>
                    <Select value={faq.category} onChange={handleFaqChange} name='category' placeholder='Select category...' color={'gray'}>
                        <option>Admission</option>
                        <option>Education</option>
                        <option>Resources</option>
                        <option>Documents</option>
                        <option>Guide</option>
                        <option>Payments</option>
                        <option>Lost & Found</option>
                        <option>Support Tickets</option>
                        <option>Transport</option>
                        <option>Shop & Merch</option>
                    </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => {onClose(); handleSubmit();}} colorScheme='blue' mr={3}>
                        Send Ticket
                    </Button>
                    <Button colorScheme='yellow' mr={3} onClick={() => {props.handleEdit(props.msgId, edit); onClose();}}>
                        Edit
                    </Button>
                    <Button colorScheme='red' mr={3} onClick={() => {props.handleDelete(props.msgId); onClose();}}>
                        Delete
                    </Button>
                    <Button colorScheme='green' onClick={() => {handleFaqSubmit(); onClose();}}>
                        Send Faq
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
        )
    }
}