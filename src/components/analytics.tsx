import {
  Box,
  Button,
  Collapse,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { ReactElement, useEffect, useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

enum AnalyticsConsentStatus {
  granted = "granted",
  denied = "denied",
}

export default function Analytics(): ReactElement {
  const [isConsentVisible, setConsentVisible] = useState(false);
  const [consentStatus, setConsentStatus] =
    useLocalStorage<AnalyticsConsentStatus | null>("analytics-consent", null);

  useEffect(() => {
    // using extra state to prevent a flash of consent on every page load
    // regardless of its status.
    setConsentVisible(consentStatus == null);

    const scriptElementId = "gtag.js";
    if (
      consentStatus === AnalyticsConsentStatus.granted &&
      document.getElementById(scriptElementId) == null
    ) {
      const tag = "G-59BXEC9WPX";
      gtag("config", tag, {
        debug_mode: process.env.NODE_ENV !== "production",
      });

      const script = document.createElement("script");
      script.id = scriptElementId;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${tag}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [consentStatus]);

  return (
    <AnalyticsConsent
      isOpen={isConsentVisible}
      onDenied={() => setConsentStatus(AnalyticsConsentStatus.denied)}
      onGranted={() => setConsentStatus(AnalyticsConsentStatus.granted)}
    />
  );
}

interface AnalyticsConsentProps {
  isOpen: boolean;
  onDenied: () => void;
  onGranted: () => void;
}

function AnalyticsConsent(props: AnalyticsConsentProps): ReactElement {
  return (
    <Box
      as={Collapse}
      in={props.isOpen}
      animateOpacity
      w={"full"}
      bg={"gray.50"}
    >
      <Stack
        maxW={"maxContentWidth"}
        mx={"auto"}
        px={{
          base: "contentPaddingXDefault",
          md: "contentPaddingXMd",
          lg: "contentPaddingXLg",
          xl: "contentPaddingXXl",
        }}
        py={4}
        direction={{ base: "column", lg: "row" }}
        align={{ base: "flex-end", lg: "center" }}
        justifyContent={"center"}
        spacing={{ base: 2, lg: 8 }}
        fontSize={"sm"}
      >
        <Text>
          We use cookies to measure website traffic and improve your experience.
          By clicking 'Accept', you consent to the use of cookies. For more
          information, please see our{" "}
          <ChakraLink
            as={GatsbyLink}
            to={"/privacy-policy"}
            color={"primary.500"}
          >
            Privacy Policy
          </ChakraLink>
          .
        </Text>
        <HStack spacing={4}>
          <Button
            size={"sm"}
            px={4}
            rounded={"full"}
            onClick={() => props.onDenied()}
          >
            Reject
          </Button>
          <Button
            size={"sm"}
            px={4}
            rounded={"full"}
            colorScheme={"primary"}
            variant={"outline"}
            onClick={() => props.onGranted()}
          >
            Accept
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
