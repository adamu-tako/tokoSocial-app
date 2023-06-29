import { Box, Center, Heading, Text } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Center w="80%" marginInline="auto" minH="90vh">
      <Box>
        <Heading marginBlock="1rem" color="primary">
          About Sydanin Forum
        </Heading>
        <Text marginBlock="1rem" textAlign="justify">
          Welcome to tokoSocial, your go-to web application designed to empower
          staff members by providing a platform for asking questions and finding
          answers. We understand that within a company, the knowledge and
          expertise of its employees are invaluable resources. That's why we
          created tokoSocial, a place where your questions are not only heard
          but answered promptly and accurately.
        </Text>
        <Text marginBlock="1rem" textAlign="justify">
          At tokoSocial, we aim to foster a collaborative environment that
          encourages knowledge sharing and problem-solving. Our platform
          functions as a hub for all your company-related inquiries, creating a
          seamless experience similar to Stack Overflow but tailored
          specifically to meet the needs of your organization. Whether you're a
          new employee seeking guidance or a seasoned professional looking to
          expand your understanding, tokoSocial is here to support you every
          step of the way.
        </Text>
        <Text marginBlock="1rem" textAlign="justify">
          Our user-friendly interface makes it easy to navigate through various
          categories and topics, ensuring that you find the information you need
          quickly and efficiently. The intuitive design promotes engagement,
          enabling you to ask questions, provide answers, and participate in
          discussions with your fellow colleagues. By harnessing the collective
          wisdom of your organization, tokoSocial facilitates the dissemination
          of knowledge, ultimately leading to increased productivity and a
          stronger sense of community within your company.
        </Text>
        <Text marginBlock="1rem" textAlign="justify">
          We understand that time is of the essence in the fast-paced corporate
          world. That's why we prioritize prompt responses and emphasize the
          importance of accurate and reliable information. With tokoSocial, you
          can rest assured that your questions will be seen by the right people
          – experts and professionals who are best equipped to provide you with
          meaningful answers. Say goodbye to lengthy email chains and fragmented
          information. tokoSocial centralizes your queries, ensuring that they
          reach the right individuals and facilitating efficient collaboration.
        </Text>
        <Text marginBlock="1rem" textAlign="justify">
          Security and privacy are paramount at tokoSocial. We employ
          industry-standard encryption protocols and robust data protection
          measures to safeguard your sensitive information. Rest easy knowing
          that your interactions on our platform are secure and confidential,
          allowing you to freely share knowledge within the confines of your
          organization.
        </Text>
        <Text marginBlock="1rem" textAlign="justify">
          tokoSocial is not just a web application; it's a solution tailored to
          enhance your company's knowledge ecosystem. Join us today and
          experience the power of a dedicated forum designed to empower your
          staff, foster collaboration, and drive innovation. Together, let's
          build a stronger, more knowledgeable organization.
        </Text>
      </Box>
    </Center>
  );
};

export default AboutPage;
