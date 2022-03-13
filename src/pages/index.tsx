import {
  Box,
  Divider,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import { FaCheckCircle } from "react-icons/fa";
import HeroIllustration from "../assets/hero-illustration.svg";
import { FDroidBadge, PlayStoreBadge } from "../components/app-store-badge";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";
import PageMeta from "../components/page-meta";
import Section from "../components/section";

export default function Home(): ReactElement {
  const { site, allPlans } = useStaticQuery(graphql`
    query HERO {
      site {
        siteMetadata {
          description
        }
      }

      allPlans {
        edges {
          node {
            billingPeriodMonths
            priceInIndianPaise
            trialPeriodDays
          }
        }
      }
    }
  `);

  const plans: PremiumPlan[] = allPlans.edges.map((e: any) => e["node"]);
  return (
    <Box maxW={"full"} minH={"100vh"} bg={"gray.50"}>
      <PageMeta />
      <NavBar />
      <Hero description={site.siteMetadata.description} />
      <Pricing premiumPlans={plans} />
      <Footer />
    </Box>
  );
}

interface HeroProps {
  description: string;
}

function Hero(props: HeroProps): ReactElement {
  const descriptionStart = props.description.split(" ");
  const descriptionEnd = descriptionStart.splice(-3);

  return (
    <Section>
      <Stack
        direction={{ base: "column", md: "row" }}
        align={"center"}
        spacing={24}
        py={{ base: 16, md: 36 }}
      >
        <VStack
          flex={1}
          spacing={{ base: 6, md: 10 }}
          align={{ base: "center", md: "flex-start" }}
        >
          <Heading
            maxW={{ base: "lg", md: "4xl" }}
            lineHeight={1.33}
            fontWeight={600}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text as={"span"}>{descriptionStart.join(" ")}</Text>
            <Text as={"span"} textColor={"primary.500"}>
              {` ${descriptionEnd.join(" ")}`}
            </Text>
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 8 }}
          >
            <PlayStoreBadge />
            <FDroidBadge />
          </Stack>
        </VStack>

        <Image
          flex={1}
          src={HeroIllustration}
          w={"full"}
          maxW={{ base: "sm", md: "2xl" }}
        />
      </Stack>
    </Section>
  );
}

interface PremiumPlan {
  billingPeriodMonths: number;
  priceInIndianPaise: number;
  trialPeriodDays: number;
}

interface PricingProps {
  premiumPlans: PremiumPlan[];
}

function Pricing(props: PricingProps): ReactElement {
  const maxTrialPeriod = Math.max(
    ...props.premiumPlans.map((p) => p.trialPeriodDays)
  );

  const monthlyPricesInr = props.premiumPlans.map(
    (p) => p.priceInIndianPaise / 100 / p.billingPeriodMonths
  );

  return (
    <Section id="pricing" py={{ base: 16, md: 36 }}>
      <Stack
        mb={8}
        direction={{ base: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={{ base: "flex-start", md: "space-around" }}
        spacing={4}
      >
        <Heading
          width={{ base: "100%", md: "40%" }}
          size={"lg"}
          lineHeight={1.33}
          textAlign={"center"}
        >
          Flexible Plans for{" "}
          <Text as={"span"} color={"purple.500"}>
            Your Needs
          </Text>
        </Heading>
        <Text
          width={{ base: "100%", md: "60%" }}
          textAlign={"center"}
          fontSize={"lg"}
          mb={8}
        >
          Use the free tier or get an improved experience with a premium plan.
          You can try a premium plan for free for up to {maxTrialPeriod} days.
        </Text>
      </Stack>
      <Divider />
      <TierInfo
        tier={"Free"}
        benefits={[
          "28 high-fidelity sounds",
          "Customised sound mixing",
          "LQ/MQ audio streaming",
          "Sleep/Wake timers on Android",
        ]}
        monthlyPricesInr={[]}
      />
      <Divider />
      <TierInfo
        tier={"Premium"}
        benefits={[
          "Everything in free-tier",
          "Natural variations in sounds",
          "HQ/UHQ audio streaming",
          "Offline Playback on Android",
        ]}
        monthlyPricesInr={monthlyPricesInr}
      />
    </Section>
  );
}

interface TierInfoProps {
  tier: string;
  benefits: string[];
  monthlyPricesInr: number[];
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
});

function TierInfo(props: TierInfoProps): ReactElement {
  const minMonthlyPrice = Math.min(...props.monthlyPricesInr);
  const maxMonthlyPrice = Math.max(...props.monthlyPricesInr);

  return (
    <Stack
      my={8}
      direction={{ base: "column", md: "row" }}
      justifyContent={{ base: "flex-start", md: "space-around" }}
      align={"center"}
      spacing={6}
    >
      <Heading flex={1} fontSize={{ base: "xl", md: "2xl" }}>
        {props.tier}
      </Heading>
      <List flex={1} spacing={2}>
        {props.benefits.map((b) => (
          <ListItem>
            <ListIcon
              as={FaCheckCircle}
              verticalAlign={"middle"}
              color={"primary.500"}
            />
            {b}
          </ListItem>
        ))}
      </List>

      {props.monthlyPricesInr.length > 0 ? (
        <Text flex={1} fontSize={{ base: "lg", md: "xl" }}>
          <Text as="span" fontSize={{ base: "2xl", md: "3xl" }}>
            {numberFormatter.format(minMonthlyPrice)}
            {" - "}
            {numberFormatter.format(maxMonthlyPrice)}
          </Text>{" "}
          per month
        </Text>
      ) : (
        <Box flex={1} />
      )}
    </Stack>
  );
}
