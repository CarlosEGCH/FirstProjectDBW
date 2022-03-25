import * as React from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Text,
  Select,
  Textarea,
  Center,
  Checkbox,
  Flex
} from '@chakra-ui/react'

export default function LoginForm(){

    return(
<FormControl bg='brand.secondary' p='20px' width='100%' height='380px'>
    <Text color='brand.accent' fontSize='35px' borderBottom='2px solid black' mb='20px'>LogIn</Text>
    <FormLabel mt='10px' htmlFor='email' color='brand.accent'>Email</FormLabel>
  <Input bg='white' color='brand.accent' id='email' type='email' width='100%' placeholder='1110000@student.uma.pt' _placeholder={{color: 'gray'}}/>
  <FormHelperText color='gray'>We'll never share your email with anyone else</FormHelperText>

  <FormLabel mt='10px' htmlFor='password' color='brand.accent'>Password</FormLabel>
  <Input bg='white' color='brand.accent' id='password' type='password' width='100%' placeholder='Type your password...' _placeholder={{color: 'gray'}}/>

<Center h='40px' mt='20px' w='100%'>
      <Flex w='100%' flexDir={'column'}>
          <Button w='100%' mt='50px' bg='brand.accent' _hover={{bg: 'brand.extra'}}>Enter</Button>        
      </Flex>
  </Center>
</FormControl>
    );
}