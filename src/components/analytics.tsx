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
import { ReactElement, useEffect } from "react";
import { useCookies } from "react-cookie";

enum AnalyticsConsentStatus {
  granted = "granted",
  denied = "denied",
}

export default function Analytics(): ReactElement {
  const cookieName = "analytics-consent";
  const [cookies, setCookie] = useCookies([cookieName]);

  const tag = "G-59BXEC9WPX";
  const debugMode = process.env.CONTEXT === "production";
  useEffect(() => {
    if (cookies[cookieName] !== AnalyticsConsentStatus.granted) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${tag}`;
    script.async = true;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    const gtag: Gtag.Gtag = function () {
      window.dataLayer.push(arguments);
    };

    gtag("js", new Date());
    gtag("consent", "default", { ad_storage: "denied" });
    gtag("config", tag, { debug_mode: debugMode });

    return function cleanup() {
      script.remove();
    };
  });

  function setConsentCookie(value: AnalyticsConsentStatus) {
    setCookie(cookieName, value, { maxAge: 3 * 30 * 24 * 60 * 60 });
  }

  return (
    <AnalyticsConsent
      isOpen={!cookies[cookieName]}
      onDenied={() => setConsentCookie(AnalyticsConsentStatus.denied)}
      onGranted={() => setConsentCookie(AnalyticsConsentStatus.granted)}
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
            onClick={() => props.onGranted()}
          >
            Accept
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
