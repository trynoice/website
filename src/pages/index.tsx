import {
  Box,
  Divider,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useBreakpointValue,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import LocaleCurrency from "locale-currency";
import { Children, ReactElement, ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaQuoteLeft } from "react-icons/fa";
import { GiCampfire, GiRiver } from "react-icons/gi";
import {
  TbAdjustments,
  TbAlarm,
  TbArrowsRandom,
  TbBabyCarriage,
  TbBed,
  TbBookmarks,
  TbBooks,
  TbCast,
  TbCloudRain,
  TbCoffee,
  TbDownload,
  TbEarOff,
  TbHourglass,
  TbLego,
  TbPlaylist,
  TbRocket,
  TbScubaMask,
  TbStar,
  TbTrees,
  TbVolume,
  TbVolume2,
  TbWaveSawTool,
  TbWaveSine,
  TbWind,
} from "react-icons/tb";
import { listPlans, SubscriptionPlan } from "../api/subscriptions";
import FishBowlIllustration from "../assets/fish-bowl.svg";
import MeditatingIllustration from "../assets/meditating.svg";
import NatureOnScreenIllustration from "../assets/nature-on-screen.svg";
import Analytics from "../components/analytics";
import BasicPageHead from "../components/basic-page-head";
import FDroidBadge from "../components/f-droid-badge";
import Footer from "../components/footer";
import GooglePlayBadge from "../components/google-play-badge";
import NavBar from "../components/nav-bar";

export function Head(): ReactElement {
  return (
    <BasicPageHead
      description={
        "Customisable soundscapes with Noice - Create personalised ambient atmospheres by blending various sounds and adjusting volume levels."
      }
    />
  );
}

const contentPaddingX = {
  base: "contentPaddingXDefault",
  md: "contentPaddingXMd",
  lg: "contentPaddingXLg",
  xl: "contentPaddingXXl",
};

export default function Home(): ReactElement {
  const { allPremiumPlan, soundLibraryInfo } = useStaticQuery(graphql`
    {
      allPremiumPlan {
        nodes {
          id
          billingPeriodMonths
          priceInIndianPaise
          trialPeriodDays
        }
      }

      soundLibraryInfo {
        totalSoundCount
        premiumSoundCount
        freeSoundCount
        freeSoundWithPremiumSegmentsCount
      }
    }
  `);

  const plans: SubscriptionPlan[] = allPremiumPlan.nodes;
  return (
    <VStack as={"main"} w={"full"} spacing={0} bgColor={"white"}>
      <Analytics />
      <NavBar />
      <VStack w={"full"} spacing={0} bgGradient={"linear(primary.50, white)"}>
        <Hero />
        <Benefits />
        <KeyFeatures />
        <SoundLibraryShowcase />
      </VStack>
      <Image
        src={FishBowlIllustration}
        w={"full"}
        bgGradient={"linear(white 97%, orange.50 97%)"} // gradient solves the bleeding edge issue in firefox.
        aria-hidden={true}
      />
      <Reviews />
      <SlantedHorizontalSeparator from={"orange.50"} to={"white"} />
      <Pricing soundLibraryInfo={soundLibraryInfo} premiumPlans={plans} />
      <WavyHorizontalSeparator from={"white"} to={"black"} />
      <Footer />
    </VStack>
  );
}

function Hero(): ReactElement {
  return (
    <Stack
      w={"full"}
      maxW={"maxContentWidth"}
      px={contentPaddingX}
      pt={{ base: 0, lg: 12 }}
      pb={12}
      direction={{ base: "column", lg: "row" }}
      align={"center"}
      justify={"center"}
      spacing={{ base: 8, md: 12, lg: 16, xl: 20 }}
    >
      <Image
        src={MeditatingIllustration}
        alt={"focused and meditating"}
        w={"full"}
        maxW={{ base: "3xs", md: "2xs", lg: "xs", xl: "sm" }}
      />

      <VStack spacing={10} align={{ base: "center", lg: "start" }}>
        <VStack
          spacing={2}
          align={{ base: "center", lg: "start" }}
          textAlign={{ base: "center", lg: "start" }}
        >
          <Heading
            lineHeight={"short"}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
            fontWeight={"normal"}
          >
            Focus. Meditate. Relax.
          </Heading>
          <Text fontSize={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}>
            With{" "}
            <Text as={"span"} color={"primary.500"} fontWeight={"medium"}>
              natural calming noise
            </Text>
            .
          </Text>
        </VStack>
        <HStack spacing={6}>
          <GooglePlayBadge />
          <FDroidBadge />
        </HStack>
      </VStack>
    </Stack>
  );
}

function Benefits(): ReactElement {
  interface BenefitProps {
    children?: ReactNode;
    icon: IconType;
  }

  function Benefit(props: BenefitProps): ReactElement {
    return (
      <HStack w={"full"} maxW={"sm"} spacing={6}>
        <Icon as={props.icon} boxSize={9} color={"primary.500"} />
        <Text fontSize={"md"}>{props.children}</Text>
      </HStack>
    );
  }

  return (
    <SimpleGrid
      w={"full"}
      maxW={"maxContentWidth"}
      px={contentPaddingX}
      py={12}
      columns={{ base: 1, md: 2, xl: 3 }}
      alignItems={"center"}
      justifyItems={"center"}
      spacingX={16}
      spacingY={6}
    >
      <Benefit icon={TbRocket}>
        Increase efficiency through heightened concentration
      </Benefit>
      <Benefit icon={TbWaveSawTool}>
        Reduce stress and anxiety through deep relaxation
      </Benefit>
      <Benefit icon={TbTrees}>
        Enhance your meditation and reading experience
      </Benefit>
      <Benefit icon={TbBed}>
        Revolutionise the way you fall asleep and wake up
      </Benefit>
      <Benefit icon={TbEarOff}>Alleviate your tinnitus symptoms</Benefit>
      <Benefit icon={TbBabyCarriage}>
        Ease your little one into a restful sleep
      </Benefit>
    </SimpleGrid>
  );
}

function KeyFeatures(): ReactElement {
  interface FeatureItemProps {
    children?: ReactNode;
    icon: IconType;
  }

  function FeatureItem(props: FeatureItemProps): ReactElement {
    return (
      <HStack justifyContent={"center"} spacing={5}>
        <Icon
          as={props.icon}
          boxSize={10}
          p={2}
          rounded={"full"}
          bg={"indigo.50"}
          color={"indigo.400"}
        />
        <Text fontWeight={500}>{props.children}</Text>
      </HStack>
    );
  }

  return (
    <Stack
      w={"full"}
      maxW={"maxContentWidth"}
      px={contentPaddingX}
      py={24}
      direction={{ base: "column", lg: "row-reverse" }}
      align={"center"}
      spacing={{ base: 12, lg: 24 }}
    >
      <Image
        src={NatureOnScreenIllustration}
        alt={"nature on screen"}
        w={"full"}
        maxW={{ base: "2xs", md: "xs", lg: "sm", xl: "md" }}
      />

      <VStack spacing={8} align={{ base: "center", lg: "start" }}>
        <Heading
          size={"xl"}
          color={"indigo.400"}
          textAlign={{ base: "center", lg: "left" }}
        >
          Dive Into a World of Natural Ambience
        </Heading>

        <Text textAlign={{ base: "center", lg: "left" }}>
          Experience the ultimate sound quality with our advanced, randomised
          audio generation technology, creating truly natural ambient sounds.
        </Text>

        <VStack
          spacing={4}
          align={"flex-start"}
          divider={<StackDivider borderColor={"indigo.100"} />}
        >
          <FeatureItem icon={TbAdjustments}>
            Effortlessly mix and match sounds
          </FeatureItem>
          <FeatureItem icon={TbArrowsRandom}>
            Advanced audio generation technology
          </FeatureItem>
          <FeatureItem icon={TbCast}>
            Stream seamlessly with Chromecast integration
          </FeatureItem>
        </VStack>
      </VStack>
    </Stack>
  );
}

function SoundLibraryShowcase(): ReactElement {
  interface SoundIconProps {
    icon: IconType;
    label: string;
  }

  function SoundIcon(props: SoundIconProps): ReactElement {
    return (
      <Tooltip
        label={props.label}
        aria-label={props.label}
        hasArrow={true}
        closeDelay={500}
        closeOnClick={false}
      >
        {/* https://github.com/chakra-ui/chakra-ui/issues/2869 */}
        <span>
          <Icon
            as={props.icon}
            boxSize={24}
            p={4}
            rounded={"full"}
            color={"orange.300"}
            _hover={{ color: "orange.400" }}
            transition={"color 0.5s cubic-bezier(.17,.67,.83,.67)"}
          />
        </span>
      </Tooltip>
    );
  }

  return (
    <VStack
      w={"full"}
      maxW={"maxContentWidth"}
      px={contentPaddingX}
      pt={{ base: 12, lg: 24 }}
      pb={{ base: 12, md: 8, lg: 4 }}
      spacing={12}
    >
      <Heading size={"lg"} textAlign={"center"}>
        Explore the Collection of{" "}
        <Text as={"span"} color={"orange.400"}>
          Carefully Chosen Sounds
        </Text>
      </Heading>

      <SimpleGrid
        columns={{ base: 2, md: 4, lg: 8 }}
        spacing={{ base: 8, md: 12 }}
      >
        <SoundIcon icon={TbWaveSine} label={"Brown, Pink and White Noise"} />
        <SoundIcon icon={TbCloudRain} label={"Rain"} />
        <SoundIcon icon={TbWind} label={"Soft Wind"} />
        <SoundIcon icon={GiCampfire} label={"Campfire"} />
        <SoundIcon icon={GiRiver} label={"Water Stream"} />
        <SoundIcon icon={TbCoffee} label={"Coffee Shop"} />
        <SoundIcon icon={TbBooks} label={"Public Library"} />
        <SoundIcon icon={TbScubaMask} label={"Scuba Diving"} />
      </SimpleGrid>

      <Text fontSize={"lg"}>...and more!</Text>
    </VStack>
  );
}

function Reviews(): ReactElement {
  interface ReviewCardProps {
    children?: ReactNode;
    author: string;
    alignSelf?: string | object;
  }

  function ReviewCard(props: ReviewCardProps) {
    return (
      <VStack
        w={"full"}
        maxW={"2xl"}
        p={8}
        rounded={"xl"}
        bg={"white"}
        boxShadow={"lg"}
        position={"relative"}
        alignSelf={props.alignSelf}
        spacing={2}
        transition={"all 0.25s cubic-bezier(.17,.67,.83,.67)"}
        _hover={{
          boxShadow: "xl",
          transform: "scale(1.1)",
        }}
      >
        <Icon
          as={FaQuoteLeft}
          position={"absolute"}
          left={6}
          top={-4}
          boxSize={8}
          color={"orange.400"}
        />
        <Text pb={2}>{props.children}</Text>
        <Text
          w={"full"}
          fontWeight={"medium"}
          fontSize={"sm"}
          textAlign={"end"}
          color={"orange.400"}
        >
          &mdash; {props.author}
        </Text>
      </VStack>
    );
  }

  return (
    <VStack w={"full"} spacing={16} py={24} bg={"orange.50"}>
      <Heading
        maxW={"maxContentWidth"}
        px={contentPaddingX}
        color={"orange.400"}
        textAlign={"center"}
      >
        Loved by people
      </Heading>
      <Stack
        maxW={"maxContentWidth"}
        px={contentPaddingX}
        direction={{ base: "column", lg: "row" }}
        spacing={16}
      >
        <ReviewCard
          author={"Polly F"}
          alignSelf={{ base: "center", lg: "flex-start" }}
        >
          Great little app, just what I needed. I love mixing sounds and it's
          easy to use. I like the different themes and think the sleep timer is
          a nice touch. The recorded sounds are all great quality and loop very
          smoothly and I love that you can change their frequency and volume
          individually. No more using YouTube white noise videos for me! One
          thing I would like would be the option to record or add your own
          sounds.
        </ReviewCard>
        <ReviewCard author={"Will Burton-Edwards"} alignSelf={"center"}>
          Noice is the perfect background noise app. I use it for reading,
          sleeping, or just relaxing after a long day. No ads, infinite loops,
          and excellent sample quality. I couldn't have asked for anything more!
        </ReviewCard>
        <ReviewCard
          author={"Miika Vuorio"}
          alignSelf={{ base: "center", lg: "flex-end" }}
        >
          Very nicely done app. I have tinnitus and this app helps me
          concentrate and sleep. In my opinion the UI is great and straight
          forward to use and the sounds are nice.
        </ReviewCard>
      </Stack>
    </VStack>
  );
}

interface PricingProps {
  soundLibraryInfo: {
    totalSoundCount: number;
    premiumSoundCount: number;
    freeSoundCount: number;
    freeSoundWithPremiumSegmentsCount: number;
  };

  premiumPlans: SubscriptionPlan[];
}

interface PlanInfo {
  id: string;
  billingPeriodMonths: number;
  monthlyPriceRaw: number;
  monthlyPrice: string;
  totalPrice: string;
  trialPeriodDays: number;
}

function Pricing(props: PricingProps): ReactElement {
  const [planInfos, setPlanInfos] = useState(
    props.premiumPlans.map((p) => subscriptionPlanToPlanInfo(p, "en-US"))
  );

  useEffect(() => {
    async function fetchPremiumPlans() {
      const locale = window.navigator.language;
      if (!locale) {
        return;
      }

      const currencyCode = LocaleCurrency.getCurrency(locale);
      if (!currencyCode) {
        return;
      }

      try {
        const plans = await listPlans("stripe", currencyCode);
        setPlanInfos(plans.map((p) => subscriptionPlanToPlanInfo(p, locale)));
      } catch (e) {
        console.warn("failed to retrieve premium plans in local currency", e);
      }
    }

    fetchPremiumPlans();
  }, []);

  const { trialPeriodDays: maxTrialPeriod } = planInfos.reduce((p, n) =>
    p.trialPeriodDays > n.trialPeriodDays ? p : n
  );

  const { monthlyPrice: minMonthlyPrice } = planInfos.reduce((p, n) =>
    p.monthlyPriceRaw < n.monthlyPriceRaw ? p : n
  );

  return (
    <VStack
      id={"pricing"}
      w={"full"}
      maxW={"maxContentWidth"}
      px={contentPaddingX}
      py={{ base: 28, md: 36 }}
      align={"flex-start"}
      spacing={12}
      lineHeight={"tall"}
    >
      <Heading>
        Find the Right Plan for{" "}
        <Text as={"span"} color={"pink.500"}>
          Yourself
        </Text>
      </Heading>

      <Divider />

      <PricingTier
        title={"Basic"}
        description={
          "Start for free with our Basic plan with the option to upgrade to Premium anytime."
        }
        pricingInfo={"Forever Free"}
      >
        <PricingTierFeature icon={TbPlaylist} title={"Rich Sound Library"}>
          Find the perfect background noise for any situation, from soothing
          seashore to peaceful chirping crickets - with{" "}
          {props.soundLibraryInfo.freeSoundCount} free sounds.
        </PricingTierFeature>

        <PricingTierFeature
          icon={TbAdjustments}
          title={"Craft Perfect Soundscapes"}
        >
          Mix and match sounds to create unique soundscapes tailored to your
          needs for enhancing focus, relaxation, or sleep.
        </PricingTierFeature>

        <PricingTierFeature
          icon={TbBookmarks}
          title={"Save & Reuse Your Favourite Mixes"}
        >
          Effortlessly revisit your favourite soundscapes by saving multiple
          custom mixes for easy access whenever you need them.
        </PricingTierFeature>

        <PricingTierFeature icon={TbVolume2} title={"Standard Audio"}>
          Listen to your preferred sounds with ease, as our base quality audio
          starts at 128 kbps in MP3 format.
        </PricingTierFeature>

        <PricingTierFeature icon={TbAlarm} title={"Alarm Clock on Android"}>
          Wake up with a boost of energy to ambient noise with our mindful
          alarms, featuring up to two active alarms for a worry-free morning.
        </PricingTierFeature>

        <PricingTierFeature icon={TbHourglass} title={"Sleep Timer on Android"}>
          Ensure an ideal bedtime routine with the auto sleep timer that
          automatically turns off the app after a set duration.
        </PricingTierFeature>
      </PricingTier>

      <Divider />

      <PricingTier
        title={"Premium"}
        description={`Unlock the full potential of Noice with a premium plan. Try it free for up to ${maxTrialPeriod} days!`}
        pricingInfo={`Starts at ${minMonthlyPrice} per month`}
      >
        {props.soundLibraryInfo.premiumSoundCount > 0 ? (
          <PricingTierFeature icon={TbStar} title={"More Sounds"}>
            Unleash the full potential of your relaxation and focus experience
            with Noice Premium - with {props.soundLibraryInfo.premiumSoundCount}{" "}
            additional sounds.
          </PricingTierFeature>
        ) : null}

        <PricingTierFeature icon={TbLego} title={"More Sound Clips"}>
          Add a new dimension to your listening with additional audio clips in{" "}
          {props.soundLibraryInfo.freeSoundWithPremiumSegmentsCount} sounds to
          make them more unique and less monotonous.
        </PricingTierFeature>

        <PricingTierFeature icon={TbTrees} title={"Natural Variations"}>
          Bring your soundscapes to life with real and natural sound variations
          generated on demand with our cutting-edge sound technology.
        </PricingTierFeature>

        <PricingTierFeature icon={TbVolume} title={"HD Audio"}>
          Experience noise like never before, with the ability to listen to
          sounds at up to 320 kbps in MP3, rendering crystal-clear,
          high-fidelity audio.
        </PricingTierFeature>

        <PricingTierFeature
          icon={TbDownload}
          title={"Offline Playback on Android"}
        >
          Enjoy soothing sounds anytime, anywhere, with Noice's offline sound
          downloads - no internet connection is required.
        </PricingTierFeature>

        <PricingTierFeature
          icon={TbAlarm}
          title={"Unlimited Alarms on Android"}
        >
          Elevate your morning routine with Noice Premium - schedule an
          unlimited number of alarms for a personalised and peaceful start to
          your day.
        </PricingTierFeature>
      </PricingTier>

      <PremiumTierPricing planInfos={planInfos} />
    </VStack>
  );
}

interface PricingTierProps {
  title: string;
  description: string;
  pricingInfo: string;
  children?: ReactNode;
}

function PricingTier(props: PricingTierProps): ReactElement {
  return (
    <SimpleGrid w={"full"} columns={{ base: 1, md: 2, lg: 3 }} spacing={12}>
      <GridItem
        maxW={"sm"}
        rowSpan={{
          base: 1,
          lg: Math.ceil(Children.count(props.children) / 2),
        }}
        colSpan={{ base: 1, md: 2, lg: 1 }}
        justifySelf={"center"}
        as={VStack}
        align={{ base: "center", lg: "flex-start" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        <Heading as={"h3"} size={"lg"} color={"pink.500"}>
          {props.title}
        </Heading>
        <Text>{props.description}</Text>
        <Text fontSize={"sm"} fontWeight={"medium"}>
          {props.pricingInfo}
        </Text>
      </GridItem>
      {props.children}
    </SimpleGrid>
  );
}

interface PricingTierFeatureProps {
  icon: IconType;
  title: string;
  children?: ReactNode;
}

function PricingTierFeature(props: PricingTierFeatureProps): ReactElement {
  return (
    <HStack w={"full"} align={"flex-start"} spacing={4}>
      <Icon as={props.icon} boxSize={6} color={"pink.500"} />
      <VStack align={"flex-start"}>
        <Heading as={"h4"} size={"sm"}>
          {props.title}
        </Heading>
        <Text fontSize={"sm"}>{props.children}</Text>
      </VStack>
    </HStack>
  );
}

interface PremiumTierPricingProps {
  planInfos: PlanInfo[];
}

function PremiumTierPricing(props: PremiumTierPricingProps): ReactElement {
  props.planInfos.sort((a, b) =>
    a.billingPeriodMonths > b.billingPeriodMonths ? -1 : 1
  );

  return (
    <VStack w={"full"} pt={{ base: 16, md: 20 }} spacing={12}>
      <Heading as={"h3"} color={"pink.500"} size={"lg"} textAlign={"center"}>
        Premium Plans
      </Heading>
      <SimpleGrid
        w={"full"}
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={8}
        alignItems={"center"}
        justifyItems={"center"}
      >
        {props.planInfos.map((info) => (
          <VStack
            key={`PremiumPlans-${info.id}`}
            w={"full"}
            maxW={"xs"}
            p={8}
            spacing={6}
            alignItems={"center"}
            textAlign={"center"}
            bg={"#fff"}
            shadow={"lg"}
            border={"1px"}
            borderColor={"gray.50"}
            borderRadius={"xl"}
          >
            <Text fontSize={"2xl"}>
              {info.billingPeriodMonths == 1
                ? "Monthly"
                : info.billingPeriodMonths == 3
                ? "Quarterly"
                : info.billingPeriodMonths == 6
                ? "Bi-yearly"
                : info.billingPeriodMonths == 12
                ? "Yearly"
                : `Every ${info.billingPeriodMonths} months`}
            </Text>
            <Text>
              <Text as="span" fontSize={"3xl"}>
                {info.monthlyPrice}
              </Text>
              /month
            </Text>
            <Text lineHeight={"taller"}>
              for{" "}
              <Text as={"span"} fontWeight={"medium"}>
                {info.totalPrice}
              </Text>
              <br />
              every{" "}
              <Text as={"span"} fontWeight={"medium"}>
                {info.billingPeriodMonths == 1
                  ? "month"
                  : `${info.billingPeriodMonths} months`}
              </Text>
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

function formatPrice(price: number, locale: string, currency: string): string {
  const format = new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  });

  return format.format(price);
}

function subscriptionPlanToPlanInfo(
  p: SubscriptionPlan,
  locale: string
): PlanInfo {
  const total = p.priceInRequestedCurrency || p.priceInIndianPaise / 100.0;
  const monthly = total / p.billingPeriodMonths;
  const currency = p.requestedCurrencyCode || "INR";
  return {
    id: p.id,
    billingPeriodMonths: p.billingPeriodMonths,
    monthlyPriceRaw: monthly,
    monthlyPrice: formatPrice(monthly, locale, currency),
    totalPrice: formatPrice(total, locale, currency),
    trialPeriodDays: p.trialPeriodDays,
  };
}

interface HorizontalSeparatorProps {
  from?: string;
  to?: string;
}

let lastWavyEdgePatternId = 0;

function WavyHorizontalSeparator(
  props: HorizontalSeparatorProps
): ReactElement {
  const patternId = `bg-${++lastWavyEdgePatternId}`;
  const baseW = 128;
  const viewBoxW = useBreakpointValue({
    base: baseW,
    sm: baseW * 1.5,
    md: baseW * 2,
    lg: baseW * 2.5,
    xl: baseW * 3,
  });

  const [bg, fg] = useToken("colors", [
    props.from || "white",
    props.to || "black",
  ]);

  return (
    <Box
      bgGradient={`linear(${bg} 97%, ${fg} 97%)`} // gradient solves the bleeding edge issue in firefox.
      as={"svg"}
      viewBox={`0 0 ${viewBoxW} 8`}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits={"userSpaceOnUse"}
          width={baseW}
          height={8}
        >
          <path fill={fg} d={"M0 2c42-8 71 12 128 0V8H0Z"} />
        </pattern>
      </defs>
      <rect width={"100%"} height={"100%"} fill={`url(#${patternId})`} />
    </Box>
  );
}

function SlantedHorizontalSeparator(
  props: HorizontalSeparatorProps
): ReactElement {
  const [bg, fg] = useToken("colors", [
    props.from || "white",
    props.to || "black",
  ]);

  return (
    <Box
      bgGradient={`linear(${bg} 1%, ${fg} 1%)`} // gradient solves the bleeding edge issue in firefox.
      as={"svg"}
      viewBox={"0 0 100 7.5"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <polyline points={"0,7.5 100,0 0,0"} fill={bg} />
    </Box>
  );
}
