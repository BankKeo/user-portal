import type { PublicArticle } from "../types/public";

export const articles: PublicArticle[] = [
  {
    id: "art-001",
    title: "Temperature Anomalies and Precipitation Shifts in the Eastern Mediterranean: A 40-Year Analysis",
    slug: "temperature-anomalies-eastern-mediterranean-40-year",
    authors: ["ana-kovac"],
    authorNames: ["Dr. Ana Kovač"],
    category: "climate-change",
    keywords: ["Mediterranean", "temperature anomaly", "precipitation", "climate trend", "regional climate"],
    abstract: "This study presents a comprehensive analysis of temperature and precipitation trends across the Eastern Mediterranean region using a 40-year dataset (1984–2024) from 127 meteorological stations. We identify a statistically significant warming trend of 0.38°C per decade, exceeding the global average, alongside a 14% reduction in winter precipitation. Our findings indicate accelerating desertification risk and increased frequency of extreme heat events, with significant implications for regional water security and agricultural productivity. Regional climate models project a further 2.1–3.4°C warming by 2070 under RCP 8.5 scenarios.",
    content: [
      {
        heading: "Introduction",
        body: "The Mediterranean basin is widely recognized as one of the most vulnerable regions to anthropogenic climate change. Situated at the interface of three continents, its climate system is governed by complex interactions between atmospheric circulation, sea surface temperatures, and orographic forcing. Long-term observational records suggest that this region is warming at approximately 1.5 times the global average rate, a trend consistent across multiple independent datasets and climate model projections.\n\nThe Eastern Mediterranean, in particular, has emerged as a climate change hotspot. Recent decades have witnessed prolonged drought episodes, record-breaking heat waves, and significant shifts in the seasonal distribution of precipitation. These changes exert cascading effects on ecosystems, agriculture, water resources, and human health across a region home to more than 200 million people."
      },
      {
        heading: "Data and Methods",
        body: "We compiled a quality-controlled dataset from 127 meteorological stations across eight countries (Greece, Turkey, Cyprus, Lebanon, Israel, Egypt, Libya, and Tunisia) for the period 1984–2024. Station records were homogenized using the MASH algorithm to remove inhomogeneities arising from station relocations, instrumentation changes, and land-use transitions. Missing data (< 3% of total records) were gap-filled using a kriging interpolation method.\n\nTrend analysis was performed using the Mann-Kendall non-parametric test, which is robust to non-normal distributions and the presence of outliers. Magnitude of trends was estimated via Sen's slope estimator. We applied a false discovery rate correction to account for multiple testing across the station network. Spatial interpolation of trend fields was accomplished using universal kriging with elevation and distance from the coast as covariates."
      },
      {
        heading: "Results",
        body: "Our analysis reveals a statistically significant warming trend across 93% of the station network, with a regional average of 0.38°C per decade (±0.04°C, 95% CI). The warming is most pronounced during summer months (June–August), where we observe a rate of 0.51°C per decade. Night-time minimum temperatures exhibit a faster warming rate (0.43°C/decade) compared to daytime maxima (0.34°C/decade), consistent with enhanced greenhouse forcing.\n\nPrecipitation trends are more spatially heterogeneous but indicate an overall reduction of 14.2 ± 3.1% in annual totals, driven primarily by decreases in the October–March wet season. The frequency of precipitation events with daily totals exceeding 50 mm (heavy precipitation) increased by 18% over the study period, despite the reduction in total amounts, suggesting intensification of individual events.\n\nThe number of days with maximum temperatures exceeding 35°C has increased by an average of 12.3 days per year across the region, with some coastal stations recording increases of more than 20 additional hot days annually."
      },
      {
        heading: "Discussion",
        body: "Our findings are consistent with, and in several respects exceed, the projections made by global climate models for this region. The faster-than-global warming observed in the Eastern Mediterranean can be attributed to several interconnected mechanisms: the weakening of the Atlantic Meridional Overturning Circulation reducing moisture transport to the region, land surface feedbacks from reduced vegetation cover, and the amplifying role of the semi-enclosed Mediterranean Sea.\n\nThe combination of warming temperatures and reduced precipitation creates a compound risk for regional water security. The observed trends, if continued, imply a 30–45% reduction in renewable freshwater availability by mid-century, threatening agricultural systems that currently support the livelihoods of approximately 40 million rural inhabitants."
      },
      {
        heading: "Conclusion",
        body: "This 40-year analysis confirms and quantifies the accelerating pace of climate change in the Eastern Mediterranean. The warming rate of 0.38°C per decade, alongside declining winter precipitation, represents one of the most pronounced climate signals observed in any inhabited region globally. These findings underscore the urgent need for region-specific adaptation strategies, investment in water-efficient agriculture, and enhanced early warning systems for extreme heat events.\n\nFuture research should focus on attribution of observed trends to anthropogenic forcing versus natural variability, and on the development of high-resolution regional projections suitable for national adaptation planning."
      }
    ],
    publishedDate: "2025-03-15",
    volume: 12,
    issue: 1,
    pages: "1–28",
    doi: "10.17345/jesam.2025.001",
    views: 4820,
    downloads: 1230,
    citations: 14,
    readingTime: 18,
    featured: true,
    trending: true,
    hasPdf: true,
    imageColor: "from-orange-500 to-red-600",
  },
  {
    id: "art-002",
    title: "Coral Bleaching Events in the Adriatic Sea: Thermal Thresholds and Recovery Dynamics",
    slug: "coral-bleaching-adriatic-thermal-thresholds",
    authors: ["marco-bielli"],
    authorNames: ["Prof. Marco Bielli"],
    category: "marine-ecosystems",
    keywords: ["coral bleaching", "Adriatic Sea", "thermal stress", "marine ecology", "recovery"],
    abstract: "Mass bleaching events in the Adriatic Sea have intensified dramatically over the past decade, threatening endemic coral communities adapted to temperate conditions. We conducted a five-year longitudinal study monitoring 84 coral colonies across 12 sites in the Northern and Central Adriatic. Our results demonstrate that bleaching onset occurs at thermal anomalies of just +1.2°C above the maximum monthly mean—lower than tropical thresholds—and that recovery rates are significantly diminished following successive annual bleaching events. These findings challenge the assumed resilience of temperate coral communities and call for immediate conservation measures.",
    content: [
      {
        heading: "Introduction",
        body: "Coral ecosystems are among the most ecologically diverse and economically valuable marine habitats on Earth. While global attention has focused on tropical reef systems, temperate coral communities—including those found in the Mediterranean Sea—host high levels of endemism and provide critical ecosystem services. The Adriatic Sea supports unique coral assemblages dominated by Cladocora caespitosa, a colonial zooxanthellate coral adapted to the region's seasonal temperature extremes.\n\nHistorically considered resilient to bleaching due to their acclimation to wide temperature ranges, these temperate corals have increasingly shown bleaching responses to summer thermal anomalies. The frequency and intensity of such events have grown in tandem with rising sea surface temperatures, raising fundamental questions about the adaptive capacity of these communities."
      },
      {
        heading: "Methods",
        body: "We established 12 permanent monitoring sites along a north-south transect spanning the Adriatic Sea, from the Gulf of Trieste to the waters off the Gargano Peninsula. At each site, we tagged and photo-monitored 84 Cladocora caespitosa colonies at monthly intervals from April to October (2020–2024). Digital image analysis was used to quantify bleaching extent (percentage of bleached polyps per colony) and recovery progress.\n\nThermal stress was quantified using Degree Heating Weeks (DHW) calculated from in-situ temperature loggers deployed at each site. We established site-specific bleaching thresholds using logistic regression of bleaching initiation against DHW accumulation and maximum thermal anomaly."
      },
      {
        heading: "Results",
        body: "Bleaching events were recorded during all five study summers, with the most severe occurring in 2022 and 2024. Bleaching onset occurred when thermal anomalies exceeded +1.2°C above the maximum monthly mean (MMM), accumulated over a minimum of 2 weeks. This threshold is substantially lower than the +1°C DHW value used for tropical reef alerts, reflecting these corals' narrower thermal tolerance window relative to their acclimatization range.\n\nColony-level bleaching intensity was strongly correlated with maximum DHW (r² = 0.79, p < 0.001). Following the 2022 bleaching event—the most severe in recorded history for the Northern Adriatic—only 61% of affected colonies showed complete recovery by the following spring. Among colonies bleached in both 2022 and 2023, the recovery rate declined to 38%, and mortality increased by 270% compared to colonies that bleached in only one year."
      },
      {
        heading: "Conclusion",
        body: "Our five-year longitudinal study demonstrates that Adriatic temperate corals are more vulnerable to thermal bleaching than previously recognized, with recovery capacity declining sharply following successive bleaching events. The observed mortality trajectories suggest that current rates of sea surface temperature increase will push these communities beyond recovery thresholds within two to three decades.\n\nUrgent conservation measures including marine protected area expansion, local stressor reduction, and assisted evolution programs are recommended to preserve these endemic communities."
      }
    ],
    publishedDate: "2025-04-02",
    volume: 12,
    issue: 2,
    pages: "45–67",
    doi: "10.17345/jesam.2025.002",
    views: 3290,
    downloads: 890,
    citations: 8,
    readingTime: 14,
    featured: true,
    trending: false,
    hasPdf: true,
    imageColor: "from-blue-500 to-cyan-600",
  },
  {
    id: "art-003",
    title: "Microplastic Contamination in Urban Groundwater: Spatial Distribution and Health Risk Assessment",
    slug: "microplastic-urban-groundwater-health-risk",
    authors: ["sarah-chen"],
    authorNames: ["Dr. Sarah Chen"],
    category: "water-resources",
    keywords: ["microplastics", "groundwater", "urban water", "health risk", "contamination"],
    abstract: "We report the first systematic characterization of microplastic contamination in urban groundwater across five European cities, analyzing 340 samples from 68 monitoring wells. Microplastic particles were detected in 94% of samples, with concentrations ranging from 12 to 847 particles/L. Polymer types included polyethylene (38%), polypropylene (24%), and polyethylene terephthalate (19%). A probabilistic health risk assessment indicates that daily exposure via drinking water consumption falls within acceptable margins under current guidelines, but cumulative exposure scenarios incorporating dermal contact and ingestion pathways suggest risk quotients approaching regulatory concern thresholds for vulnerable populations.",
    content: [
      {
        heading: "Introduction",
        body: "Microplastics—plastic particles smaller than 5 mm—have emerged as pervasive environmental contaminants detected across virtually all Earth system compartments. While extensive research has documented microplastic occurrence in surface waters, oceans, and soils, the presence and fate of these particles in groundwater systems has received comparatively little attention. Groundwater represents approximately 30% of global freshwater resources and constitutes the primary drinking water source for more than 2 billion people worldwide.\n\nUrban groundwater is particularly susceptible to microplastic contamination through multiple pathways: infiltration through soils amended with sewage sludge, leachate from landfills and waste disposal sites, atmospheric deposition of airborne microplastics, and direct introduction via stormwater infiltration systems. Understanding the spatial distribution, polymer composition, and fate of microplastics in urban aquifers is essential for assessing potential risks to drinking water quality and human health."
      },
      {
        heading: "Sampling and Analysis",
        body: "Groundwater samples were collected from 68 monitoring wells distributed across five European cities: Zurich, Vienna, Warsaw, Barcelona, and Amsterdam. Wells were selected to represent a range of hydrogeological settings, land use types, and aquifer depths. Five sampling campaigns were conducted between March 2023 and September 2024 (340 total samples), encompassing seasonal variation in recharge conditions.\n\nMicroplastic extraction was performed using a validated stainless-steel filtration protocol followed by chemical digestion of organic matter. Particles were identified and characterized using Fourier-transform infrared spectroscopy (FTIR) with an automated particle analysis algorithm. Size fractionation distinguished four size classes: 1–10 μm, 10–100 μm, 100–1000 μm, and 1–5 mm."
      },
      {
        heading: "Results and Risk Assessment",
        body: "Microplastic particles were detected in 320 of 340 samples (94%), with concentrations spanning two orders of magnitude (12–847 particles/L). The highest concentrations were associated with shallow urban aquifers (< 15 m depth) beneath impervious surfaces with stormwater infiltration systems. Deep confined aquifers showed significantly lower contamination levels (median 28 particles/L vs. 156 particles/L for shallow unconfined aquifers).\n\nThe probabilistic health risk assessment, modeled for three age groups (children 2–6, adults, and elderly), indicated that risk quotients for individual exposure pathways (drinking water only) remained below 1.0 under 95th percentile scenarios. However, cumulative exposure models incorporating dermal contact during bathing and incidental ingestion during recreational activities yielded risk quotients of 1.3–2.1 for children in high-contamination scenarios, exceeding the threshold of regulatory concern."
      },
      {
        heading: "Conclusion",
        body: "This study provides the first multi-city systematic assessment of microplastic contamination in urban European groundwater. The near-ubiquitous presence of microplastics across all sites underscores the pervasive nature of plastic pollution in the urban water cycle. While single-pathway risk estimates remain below regulatory thresholds for most scenarios, cumulative multi-pathway assessments indicate potential health concerns for vulnerable populations, particularly children, in high-contamination urban settings.\n\nWe recommend the urgent development of standardized monitoring protocols for microplastics in drinking water sources, revision of health risk assessment frameworks to incorporate cumulative and mixture effects, and investment in advanced treatment technologies capable of removing sub-micron plastic particles."
      }
    ],
    publishedDate: "2025-02-20",
    volume: 12,
    issue: 1,
    pages: "29–54",
    doi: "10.17345/jesam.2025.003",
    views: 5640,
    downloads: 1820,
    citations: 22,
    readingTime: 16,
    featured: false,
    trending: true,
    hasPdf: true,
    imageColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "art-004",
    title: "Forest Dieback in Central European Mountain Ecosystems: Bark Beetle Outbreaks Under Climate Stress",
    slug: "forest-dieback-central-european-bark-beetle",
    authors: ["luka-horvat"],
    authorNames: ["Prof. Luka Horvat"],
    category: "biodiversity",
    keywords: ["forest dieback", "bark beetle", "Ips typographus", "mountain ecosystems", "drought stress"],
    abstract: "Central European spruce forests are experiencing unprecedented mortality driven by drought-stressed trees and expanding Ips typographus bark beetle populations. We combined satellite-derived forest disturbance mapping, dendrochronological analysis, and field beetle population data across 4,200 km² of montane forest in Slovenia, Austria, and the Czech Republic (2015–2024). We demonstrate that drought-induced hydraulic failure in Norway spruce preceded and amplified bark beetle outbreaks by 2–3 years, and that post-disturbance regeneration is shifting toward broadleaf-dominated successional communities. These dynamics represent a landscape-scale ecological transformation with profound carbon cycle implications.",
    content: [
      {
        heading: "Introduction",
        body: "Norway spruce (Picea abies) forests cover approximately 22 million hectares across Central Europe, representing both the dominant commercial timber species and a cornerstone of montane ecosystem structure. These monoculture and near-monoculture plantations, established across large swaths of their natural range during the 19th and 20th centuries, are now facing an existential crisis driven by the interacting effects of climate change and biotic disturbance.\n\nThe European spruce bark beetle (Ips typographus) is a native forest insect whose population dynamics are intricately linked to host tree vulnerability. Under natural conditions, healthy trees can resist beetle colonization through resinosis—the production and ejection of resin under pressure. However, trees subjected to chronic or acute drought stress exhibit severely reduced resin synthesis capacity, rendering them vulnerable to mass attack. Climate warming simultaneously reduces drought resistance in conifers and accelerates beetle development, enabling two or three generations per year in regions historically supporting only one."
      },
      {
        heading: "Methods",
        body: "Forest disturbance mapping was conducted using dense time-series analysis of Sentinel-2 multispectral imagery (10 m spatial resolution) combined with Landsat archive data extending back to 2000. Change detection employed the LandTrendr spectral-temporal segmentation algorithm, calibrated against field verification data from 312 ground plots. Disturbance patches were classified by severity (complete mortality vs. partial crown damage) and spatial connectivity.\n\nDendrochronological cores were extracted from 540 standing dead trees across 18 sites to reconstruct growth trajectories and identify pre-disturbance stress signatures. Ring-width chronologies were standardized using cubic spline detrending and crossdated to ensure accurate annual resolution. Beetle population data were obtained from standardized pheromone trap networks maintained by national forest services in all three countries."
      },
      {
        heading: "Results",
        body: "Satellite mapping identified 127,400 ha of severe forest disturbance within the study area between 2015 and 2024—an area 3.8 times larger than the cumulative disturbance recorded in the preceding 15-year period. Disturbance rates accelerated markedly after 2018, coinciding with the region's most severe drought on instrumental record.\n\nDendrochronological analysis revealed a consistent pattern of declining radial growth beginning 2–5 years before visible crown damage, with growth anomalies linked to reconstructed Palmer Drought Severity Index values. The lag between growth decline onset and beetle-induced mortality averaged 2.7 years (SD ± 0.8 years), supporting a cascade model in which drought predisposes trees to beetle attack.\n\nPost-disturbance regeneration surveys across 89 plots showed that bare mineral soil areas favor establishment of pioneer broadleaf species (primarily birch, willow, and rowan) over spruce, particularly at lower elevations where soil temperatures during the regeneration season now routinely exceed 30°C."
      },
      {
        heading: "Conclusion",
        body: "Our integrated analysis reveals a climate-driven ecological transformation unfolding at unprecedented spatial scales in Central European montane forests. The 2–3 year lag between drought-induced physiological stress and visible bark beetle mortality provides a diagnostic window for early intervention, but the rapid acceleration of disturbance suggests that management responses are currently inadequate to the pace of change.\n\nThe emerging broadleaf-dominated successional trajectories represent both a challenge (loss of commercial timber value and established ecosystem services) and an opportunity (potential enhancement of ecological resilience and carbon storage). Long-term monitoring programs and adaptive management strategies that facilitate rather than resist this transition are urgently needed."
      }
    ],
    publishedDate: "2025-01-30",
    volume: 11,
    issue: 4,
    pages: "312–341",
    doi: "10.17345/jesam.2025.004",
    views: 2870,
    downloads: 740,
    citations: 11,
    readingTime: 20,
    featured: false,
    trending: true,
    hasPdf: true,
    imageColor: "from-emerald-600 to-green-700",
  },
  {
    id: "art-005",
    title: "Agrivoltaic Systems in Semi-Arid Regions: Dual-Use Land Optimization for Food and Energy Security",
    slug: "agrivoltaic-systems-semi-arid-food-energy",
    authors: ["maya-patel"],
    authorNames: ["Dr. Maya Patel"],
    category: "renewable-energy",
    keywords: ["agrivoltaics", "solar energy", "food security", "semi-arid", "land use"],
    abstract: "Agrivoltaic systems—the co-location of solar photovoltaic infrastructure with agricultural production—offer a promising solution to land-use conflicts in food- and energy-insecure regions. We evaluate the performance of eight agrivoltaic installations across semi-arid zones in Rajasthan, India, measuring crop yields, solar energy output, soil moisture retention, and farmer economic outcomes over three growing seasons (2022–2024). Our results demonstrate that strategically designed agrivoltaic systems can simultaneously achieve 87% of baseline crop yields and generate 110–145% of standalone PV energy output, while reducing soil moisture evaporation by 29%, offering compelling evidence for agrivoltaic adoption under water-stressed conditions.",
    content: [
      {
        heading: "Introduction",
        body: "The global energy transition and the imperative to increase food production present a fundamental land-use dilemma, particularly acute in densely populated developing nations where arable land is simultaneously demanded for agriculture and solar energy infrastructure. Rajasthan, India's largest state, embodies this tension: it hosts exceptional solar irradiance (5.5–6.5 kWh/m²/day) and acute agricultural water stress driven by declining groundwater tables and erratic monsoon precipitation.\n\nAgrivoltaics—the deliberate integration of solar panels with crop production on the same land—has emerged as a potential solution to this dilemma. By elevating solar panels to allow farming beneath, agrivoltaic systems can potentially achieve land equivalent ratios greater than 1.0, meaning more combined food and energy output per unit land area than separate food and energy production on the same total area."
      },
      {
        heading: "Study Design and Measurements",
        body: "Eight agrivoltaic installations ranging from 0.5 to 2.4 ha were established in partnership with farming cooperatives across three districts of Rajasthan. Panel configurations varied systematically: two installations used east-west fixed tilt (20°), four used south-facing fixed tilt (25°), and two used single-axis horizontal tracking systems. Panel density ranged from 35% to 60% ground coverage ratio. Control plots of identical size were maintained adjacent to each installation for crop yield comparison.\n\nMeasurements included: solar energy output (continuous), crop biomass and marketable yield (at harvest), continuous soil moisture at three depths (10, 30, 60 cm), microclimate parameters (air temperature, relative humidity, wind speed at canopy level), and detailed farmer labor and economic accounts."
      },
      {
        heading: "Results",
        body: "Across all sites and crop types (wheat, chickpea, mustard, and vegetables), agrivoltaic plots achieved an average of 87.2% of control plot yields (range: 71–103%). Crops with higher shade tolerance—particularly leafy vegetables and chickpea—showed minimal yield reduction (< 5%) and in some cases yield increases under panel shade during peak summer temperatures.\n\nSolar energy output averaged 131% of equivalent standalone PV installations, attributable to the cooling effect of transpiring crops on panel surface temperatures (average reduction: 4.3°C), which improves photovoltaic conversion efficiency. Soil volumetric water content in agrivoltaic plots was consistently 18–39% higher than in control plots during the pre-monsoon period, translating to 29% average reduction in irrigation water demand.\n\nFarmer net income from combined food and energy revenues exceeded control plot income by an average of 68%, with energy lease payments representing 41% of total household income for participating farmers."
      },
      {
        heading: "Conclusion",
        body: "Our three-season evaluation demonstrates that optimally designed agrivoltaic systems in semi-arid environments can achieve near-equivalent crop yields while generating substantial solar energy, reducing irrigation requirements, and significantly improving farmer livelihoods. The synergistic relationship between crops and panels—where crops cool panels and panels shade and protect crops—challenges the assumption that solar energy development necessarily displaces agricultural production.\n\nScaling agrivoltaics in Rajasthan and similar semi-arid regions could contribute meaningfully to India's renewable energy targets while supporting the food security and economic resilience of smallholder farming communities. Policy frameworks that incentivize agrivoltaic adoption and simplify dual land-use permitting are the critical next step."
      }
    ],
    publishedDate: "2025-04-18",
    volume: 12,
    issue: 2,
    pages: "88–112",
    doi: "10.17345/jesam.2025.005",
    views: 3150,
    downloads: 960,
    citations: 5,
    readingTime: 15,
    featured: true,
    trending: false,
    hasPdf: true,
    imageColor: "from-yellow-500 to-orange-500",
  },
  {
    id: "art-006",
    title: "PM2.5 Source Apportionment in Central European Cities: Traffic, Industry, and Long-Range Transport",
    slug: "pm25-source-apportionment-central-european-cities",
    authors: ["ivan-novak"],
    authorNames: ["Prof. Ivan Novak"],
    category: "air-quality",
    keywords: ["PM2.5", "source apportionment", "air pollution", "urban health", "receptor modeling"],
    abstract: "Fine particulate matter (PM2.5) remains the leading environmental health risk in Central Europe, responsible for approximately 380,000 premature deaths annually. We applied positive matrix factorization (PMF) source apportionment modeling to two years of PM2.5 chemical speciation data from eight Central European cities. Traffic-related emissions accounted for 28–34% of PM2.5 in all cities, while biomass burning emerged as the dominant source during winter months (42–58%). Long-range transport contributions ranged from 21–39%, highlighting the importance of supranational policy coordination. Our results provide essential evidence for targeted emission reduction strategies.",
    content: [
      {
        heading: "Introduction",
        body: "Ambient fine particulate matter with aerodynamic diameter ≤ 2.5 μm (PM2.5) is classified by the World Health Organization as the environmental health risk factor with the greatest global burden of disease. In Central Europe, chronic exposure to PM2.5 concentrations exceeding WHO guidelines is the norm rather than the exception, contributing to cardiovascular and respiratory mortality, reduced cognitive development in children, and elevated cancer risk. Despite decades of regulatory effort under the EU Clean Air Policy Package, numerous Central European cities—particularly in Poland, Czech Republic, and Slovakia—continue to exceed annual mean PM2.5 standards.\n\nEffective pollution control requires accurate knowledge of emission source contributions—information that cannot be derived from total mass measurements alone. Source apportionment techniques, which use chemical composition data to back-calculate contributions from different emission categories, are essential tools for designing evidence-based pollution reduction strategies."
      },
      {
        heading: "Methods",
        body: "PM2.5 sampling was conducted at eight urban background monitoring stations in Prague, Warsaw, Kraków, Bratislava, Budapest, Vienna, Brno, and Wrocław using synchronized 24-hour filter collections on alternate days over a 24-month period (January 2023–December 2024). Filters were analyzed for a comprehensive suite of 52 chemical species including major ions, elements (ICP-MS), elemental carbon, organic carbon, and specific organic marker compounds (levoglucosan, hopanes, steranes).\n\nSource apportionment was performed using the US EPA PMF 5.0 model with uncertainty estimation via bootstrap resampling (500 runs) and displacement analysis. Factor profiles were matched to source signatures using a combination of chemical mass balance and expert judgment, cross-validated against emission inventory data from the EMEP framework."
      },
      {
        heading: "Results",
        body: "Seven source factors were resolved consistently across all eight cities: traffic (exhaust and non-exhaust), biomass burning, coal combustion, secondary inorganic aerosol (nitrate-rich), secondary inorganic aerosol (sulfate-rich), long-range transport, and industrial/crustal dust. Traffic contributions were relatively uniform across cities (28–34% annual average), while biomass burning showed strong seasonal variation—minimal in summer (8–14%) but dominant in winter (42–58%).\n\nLong-range transport contributions (21–39%) were largest in southern cities (Vienna, Budapest) during summer, attributable to photochemically-aged aerosols transported from Southern and Eastern Europe. Coal combustion contributions, while declining overall, remain significant in Polish cities (15–22% annual average) and during winter heating periods."
      },
      {
        heading: "Conclusion",
        body: "This multi-city source apportionment study reveals that winter biomass burning, particularly residential wood and coal combustion, is now the dominant PM2.5 source in Central European cities during the heating season—a finding with profound implications for regulatory strategy. While traffic has received the greatest regulatory attention in recent decades, our results suggest that accelerating the phase-out of solid fuel residential heating would yield greater air quality benefits than equivalent effort applied to traffic emission reductions.\n\nThe substantial long-range transport contributions (21–39%) confirm that local action alone is insufficient and must be complemented by coordinated policies at the EU level, including stricter emission standards for residential combustion appliances and transboundary abatement agreements."
      }
    ],
    publishedDate: "2025-03-05",
    volume: 12,
    issue: 1,
    pages: "55–82",
    doi: "10.17345/jesam.2025.006",
    views: 2640,
    downloads: 680,
    citations: 9,
    readingTime: 17,
    featured: false,
    trending: false,
    hasPdf: true,
    imageColor: "from-sky-500 to-blue-600",
  },
  {
    id: "art-007",
    title: "Alpine Pollinator Decline: Elevational Shifts and Phenological Mismatches Under Warming Conditions",
    slug: "alpine-pollinator-decline-elevational-shifts",
    authors: ["luka-horvat"],
    authorNames: ["Prof. Luka Horvat"],
    category: "biodiversity",
    keywords: ["pollinators", "alpine ecology", "phenology", "climate warming", "plant-pollinator interaction"],
    abstract: "Alpine pollinator communities are among the most rapidly responding biological indicators of climate change. We monitored bee and butterfly communities across an elevational gradient (800–2,400 m a.s.l.) in the Julian Alps over eight years (2016–2024), documenting species composition, abundance, and flowering phenology of primary forage plants. We find that pollinator community centroids have shifted upslope by 38 m per decade, while early-flowering plant phenology has advanced by 12 days over the study period. The resulting phenological mismatch between pollinators and key forage plants threatens the reproductive success of both and risks cascading effects on alpine plant diversity.",
    content: [
      {
        heading: "Introduction",
        body: "Alpine ecosystems occupy less than 3% of Earth's land surface yet harbor exceptional biodiversity, including a disproportionate number of endemic species. Their steep environmental gradients—where temperature, precipitation, and UV radiation change dramatically over short distances—make them both unique laboratories for studying ecological responses to climate change and particularly vulnerable to the disruption of finely tuned species interactions.\n\nPollinators are keystone species in alpine ecosystems, providing essential services to approximately 75% of alpine flowering plants. Alpine bee and butterfly communities are characterized by high specialization and low redundancy, meaning that the loss or displacement of even a few species can have outsized effects on plant reproduction and community composition."
      },
      {
        heading: "Methods",
        body: "We established 24 permanent transects distributed across six elevational bands (200 m intervals from 800 to 2,400 m) in the Julian Alps, spanning the Triglav National Park and adjacent protected areas. Pollinator surveys were conducted using standardized 15-minute timed counts along 50 m transects during peak activity periods (10:00–16:00, temperatures > 12°C, wind < 3 Beaufort). Surveys were repeated three times per season, for a total of 1,728 survey visits over the eight-year study period.\n\nFlowering phenology was monitored at 312 permanent observation plots recording first bloom dates, peak bloom, and end of flowering for 47 focal plant species. Temperature data were obtained from a network of 18 calibrated iButton loggers at each site, supplemented by ERA5 reanalysis data."
      },
      {
        heading: "Results",
        body: "We recorded 147 bee species and 64 butterfly species across the study gradient, with distinct elevational zonation patterns. Linear mixed models revealed a significant upslope shift in community composition centroids for both bees (38.2 ± 6.4 m/decade, p < 0.001) and butterflies (31.7 ± 8.1 m/decade, p = 0.002).\n\nFlowering phenology of early-spring and early-summer species advanced significantly faster than late-summer species. Early-blooming species showed advances of 1.8–3.2 days per degree of warming, while late-season species advanced only 0.4–0.9 days/°C. This differential phenological response created expanding temporal mismatches between first-flight dates of specialist pollinators and peak flower availability of their preferred forage plants.\n\nSpecies richness at the highest elevational band (2,200–2,400 m) increased by 34% over the study period as range-expanding thermophilic species colonized, while community-level abundance declined by 18% due to the loss of cold-adapted specialist species."
      },
      {
        heading: "Conclusion",
        body: "Our eight-year dataset documents ongoing and accelerating restructuring of alpine pollinator communities in response to climate warming. The combination of upslope range shifts and phenological mismatches creates compounding threats to plant-pollinator mutualism networks that underpin alpine ecosystem function.\n\nConservation responses should prioritize maintaining habitat connectivity across elevational gradients to facilitate species range shifts, protecting high-elevation refugia where cold-adapted specialists may persist, and monitoring phenological synchrony as an early warning indicator of ecosystem disruption."
      }
    ],
    publishedDate: "2024-11-20",
    volume: 11,
    issue: 3,
    pages: "198–224",
    doi: "10.17345/jesam.2024.007",
    views: 1980,
    downloads: 520,
    citations: 7,
    readingTime: 16,
    featured: false,
    trending: false,
    hasPdf: true,
    imageColor: "from-purple-500 to-violet-600",
  },
  {
    id: "art-008",
    title: "Urban Heat Island Mitigation Through Green Infrastructure: A Pan-European Assessment",
    slug: "urban-heat-island-green-infrastructure-europe",
    authors: ["ivan-novak", "ana-kovac"],
    authorNames: ["Prof. Ivan Novak", "Dr. Ana Kovač"],
    category: "urban-ecology",
    keywords: ["urban heat island", "green infrastructure", "urban cooling", "European cities", "thermal comfort"],
    abstract: "Urban heat islands (UHI) amplify climate change impacts on city residents, with peak temperature differentials of 4–8°C in major European cities. We conducted a systematic assessment of green infrastructure cooling effectiveness using remote sensing thermal data, urban morphology analysis, and microclimate measurements across 24 European cities. Urban forests achieve the greatest mean cooling (2.8°C/ha), followed by extensive green roofs (1.4°C/ha), pocket parks (1.1°C/ha), and street trees (0.9°C/100 m street). These findings provide city planners with a evidence-based hierarchy of green infrastructure interventions for urban climate adaptation.",
    content: [
      {
        heading: "Introduction",
        body: "The urban heat island effect—the phenomenon by which urban areas experience higher temperatures than surrounding rural regions—has intensified as both climate warming and urbanization accelerate simultaneously. In European cities, the convergence of the UHI with increasingly frequent and severe heat waves poses acute risks to human health, with the 2003 and 2019 European heat waves causing an estimated 70,000 and 2,500 excess deaths respectively.\n\nGreen infrastructure—encompassing urban trees, parks, green roofs, green walls, and water features—is widely promoted as a nature-based solution for urban heat mitigation. However, the comparative effectiveness of different green infrastructure types is poorly quantified, limiting the ability of urban planners to allocate limited resources optimally."
      },
      {
        heading: "Methods",
        body: "We assembled a dataset of thermal infrared imagery, green infrastructure inventories, urban morphology data, and ground-based microclimate measurements for 24 European cities spanning a latitudinal gradient from Helsinki to Seville. Satellite thermal data from Landsat 8/9 and ECOSTRESS were processed to derive land surface temperature maps at 30 m resolution for 120 hot-weather days (daily maximum > 30°C) distributed across three summers (2022–2024).\n\nGreen infrastructure was mapped from a combination of municipal GIS databases, aerial photography interpretation, and Google Street View validation. Cooling effectiveness was quantified as the reduction in mean land surface temperature within and downwind of each green infrastructure element relative to adjacent impervious surfaces of equivalent size."
      },
      {
        heading: "Results",
        body: "Urban forests (contiguous tree canopy > 1 ha) provided the greatest cooling intensity (2.8°C mean reduction per ha) and the largest spatial extent of cooling effect, with measurable temperature reductions extending 1.5–3 times the distance of the forest radius into surrounding built-up areas. Cooling effectiveness was strongly modulated by tree species composition, with broadleaf deciduous species providing 1.6 times greater cooling than equivalent areas of evergreen conifers.\n\nExtensive green roofs (> 0.2 ha continuous area) achieved mean surface temperature reductions of 1.4°C/ha, with effects primarily localized above the rooftop. Pocket parks (0.1–1 ha) showed mean cooling of 1.1°C/ha extending up to 100 m beyond park boundaries. Individual street trees provided cooling of approximately 0.9°C per 100 m of tree-lined street at canopy height, with greater effects during morning hours when solar angles are lower.\n\nMultivariate analysis identified tree canopy coverage (β = 0.71) as the strongest predictor of city-scale UHI intensity, followed by impervious surface fraction (β = 0.58) and building height-to-street-width ratio (β = 0.44)."
      },
      {
        heading: "Conclusion",
        body: "This pan-European assessment establishes a robust, evidence-based hierarchy of green infrastructure cooling effectiveness that can directly inform urban climate adaptation planning. Urban forests provide the greatest thermal benefit per unit area and should be prioritized in urban greening strategies, particularly in medium- and high-density neighborhoods where land availability is constrained.\n\nCity-level cooling targets equivalent to a 2°C reduction in peak UHI intensity are achievable through combinations of urban forest expansion, green roof mandates for new construction, and systematic street tree planting, without requiring unrealistic land area conversions."
      }
    ],
    publishedDate: "2025-02-08",
    volume: 12,
    issue: 1,
    pages: "83–109",
    doi: "10.17345/jesam.2025.008",
    views: 3410,
    downloads: 1080,
    citations: 13,
    readingTime: 19,
    featured: false,
    trending: true,
    hasPdf: true,
    imageColor: "from-violet-500 to-purple-600",
  },
  {
    id: "art-009",
    title: "Nitrate Leaching in Intensive Agricultural Watersheds: Long-Term Trends and Management Options",
    slug: "nitrate-leaching-agricultural-watersheds-management",
    authors: ["sarah-chen"],
    authorNames: ["Dr. Sarah Chen"],
    category: "sustainable-agriculture",
    keywords: ["nitrate", "agricultural runoff", "water quality", "watershed", "precision agriculture"],
    abstract: "Excessive nitrogen fertilization in intensive agricultural systems drives nitrate leaching to groundwater and surface waters, causing widespread eutrophication and drinking water quality impairment. We analyzed 30 years of nitrate concentration data from 48 agricultural watersheds across Northern Europe, combined with detailed land management records and fertilizer application data. Nitrate concentrations increased at 89% of sites between 1994 and 2014, but trend reversal was observed at 62% of sites where precision agriculture and catch crop adoption exceeded 40% of farmland area. These findings highlight the effectiveness of targeted agronomic interventions and the importance of critical adoption thresholds.",
    content: [
      {
        heading: "Introduction",
        body: "Agricultural nitrogen management sits at the intersection of food security, climate change, and water quality challenges. Modern intensive agriculture depends on synthetic nitrogen fertilizers to achieve high crop yields, but fertilizer application rates routinely exceed crop uptake efficiency, resulting in substantial nitrogen losses to the environment. In European agricultural watersheds, excess nitrate leaches through the soil profile to contaminate groundwater and enters surface waters via tile drainage and surface runoff, driving eutrophication in lakes, rivers, and coastal marine systems."
      },
      {
        heading: "Data Sources and Analysis",
        body: "Long-term nitrate concentration data (1994–2024) were compiled from 48 agricultural monitoring watersheds in Denmark, Netherlands, Germany, and Poland. Watershed areas ranged from 12 to 847 km² with agricultural land use fractions of 68–94%. Data were provided by national environmental monitoring agencies and included quarterly or monthly composite samples from watershed outlets.\n\nLand management variables were assembled from agricultural census records, satellite crop mapping, and national databases of fertilizer sales and application statistics. Precision agriculture adoption (GPS-guided variable rate application) and catch crop coverage were tracked annually from 2010 onwards."
      },
      {
        heading: "Results",
        body: "Over the full 30-year study period, mean nitrate concentrations increased significantly at 43 of 48 watersheds (89.6%), with a regional average trend of +0.31 mg NO₃-N/L/year between 1994 and 2014. The period 2014–2024 showed a marked divergence: concentrations continued rising at 18 watersheds (37.5%) while declining significantly at 30 watersheds (62.5%).\n\nDeclining trends were strongly associated with the adoption of precision agriculture (variable rate fertilizer application) and the establishment of cover crops and catch crops, with a threshold effect emerging at approximately 40% farmland area adoption. Below this threshold, no significant nitrate reductions were observed; above it, watershed nitrate concentrations declined at average rates of 0.18–0.42 mg NO₃-N/L/year."
      },
      {
        heading: "Conclusion",
        body: "Our 30-year watershed analysis reveals a fundamentally non-linear relationship between agricultural management intensity and water quality outcomes: targeted adoption of precision agriculture and catch cropping below critical threshold levels produces little measurable water quality benefit, while achieving adoption above the ~40% threshold triggers significant and sustained nitrate reductions.\n\nThis threshold behavior has important policy implications: financial incentives and regulatory requirements should be designed to achieve adoption rates sufficient to cross the transition threshold across entire watersheds rather than distributed across many watersheds at sub-threshold rates."
      }
    ],
    publishedDate: "2024-12-15",
    volume: 11,
    issue: 4,
    pages: "267–291",
    doi: "10.17345/jesam.2024.009",
    views: 1750,
    downloads: 490,
    citations: 6,
    readingTime: 14,
    featured: false,
    trending: false,
    hasPdf: true,
    imageColor: "from-lime-600 to-green-700",
  },
  {
    id: "art-010",
    title: "Seagrass Carbon Stocks in the Adriatic: Mapping Blue Carbon Ecosystems for Climate Mitigation",
    slug: "seagrass-carbon-stocks-adriatic-blue-carbon",
    authors: ["marco-bielli"],
    authorNames: ["Prof. Marco Bielli"],
    category: "marine-ecosystems",
    keywords: ["seagrass", "blue carbon", "carbon sequestration", "Posidonia oceanica", "Mediterranean"],
    abstract: "Seagrass meadows rank among the most carbon-dense ecosystems on Earth yet remain severely understudied in European policy and carbon accounting frameworks. We combined multibeam sonar mapping, sediment coring, and stable isotope analysis to characterize the distribution and carbon storage capacity of Posidonia oceanica meadows across 1,840 km² of the Adriatic Sea. We estimate total seagrass blue carbon stocks of 8.4 ± 1.2 Tg C, with sediment organic carbon representing 91% of total stocks. Current meadow loss rates of 2.3% per year from anchoring, trawling, and eutrophication threaten to convert these carbon sinks into sources, releasing an estimated 0.19 Tg C annually.",
    content: [
      {
        heading: "Introduction",
        body: "Blue carbon—the carbon captured and stored in coastal marine ecosystems—is receiving increasing recognition as a climate mitigation strategy and an accounting category in national greenhouse gas inventories. Among coastal blue carbon ecosystems, seagrass meadows are exceptional: they cover less than 0.2% of the ocean floor but store approximately 10% of the carbon buried in ocean sediments annually. The Mediterranean endemic Posidonia oceanica, with its slow growth rate, extraordinary longevity, and deep matte accumulation, may sequester carbon on millennial timescales."
      },
      {
        heading: "Methods",
        body: "Seagrass distribution mapping was conducted over two field seasons using vessel-mounted multibeam echo sounder (MBES) systems, calibrated against point observations from scientific diver surveys and underwater video transects. The mapped area of 1,840 km² encompasses the northern and central Adriatic continental shelf to a depth of 40 m.\n\nCarbon stock assessment followed the IPCC Wetlands Supplement methodology, combining biomass measurements from 127 sediment cores with organic carbon analysis by loss-on-ignition and elemental analysis. Accelerator mass spectrometry radiocarbon dating of sediment profiles at 24 core sites enabled age-depth modeling and historical carbon accumulation rate reconstruction."
      },
      {
        heading: "Results",
        body: "Posidonia oceanica meadows were mapped across 184,320 ha of Adriatic seabed, with dense meadows (> 300 shoots/m²) concentrated along the eastern coastline between 5 and 30 m depth. Total blue carbon stocks were estimated at 8.4 ± 1.2 Tg C, of which 7.6 Tg C (91%) is stored in seagrass matte and underlying sediments, with the remainder in aboveground and belowground biomass.\n\nMeadow area has declined by 31.4% since 1984 based on comparison with historical aerial photography and dive survey records. Current loss rates, estimated at 2.3% per year from satellite change detection, are dominated by chronic disturbance from recreational boat anchoring (39%), bottom trawling in nominally protected areas (28%), and nutrient enrichment from coastal development (22%)."
      },
      {
        heading: "Conclusion",
        body: "Adriatic Posidonia oceanica meadows represent a substantial and hitherto unquantified blue carbon resource whose protection offers co-benefits for biodiversity, fisheries, and coastal protection. The conversion of these carbon sinks to sources through ongoing meadow degradation undermines both climate targets and the economic value of coastal ecosystem services.\n\nWe recommend the immediate inclusion of Adriatic seagrass blue carbon in Italian and Croatian national greenhouse gas inventories, expansion of anchor-free zones and effective trawling prohibitions across mapped meadow areas, and the development of a Mediterranean-wide blue carbon conservation and restoration program."
      }
    ],
    publishedDate: "2025-01-12",
    volume: 12,
    issue: 1,
    pages: "110–138",
    doi: "10.17345/jesam.2025.010",
    views: 2180,
    downloads: 610,
    citations: 10,
    readingTime: 17,
    featured: false,
    trending: false,
    hasPdf: true,
    imageColor: "from-teal-500 to-cyan-600",
  },
  {
    id: "art-011",
    title: "Carbon Flux Variability in European Temperate Forests: Eddy Covariance Evidence from 15 Sites",
    slug: "carbon-flux-european-temperate-forests-eddy-covariance",
    authors: ["luka-horvat", "ana-kovac"],
    authorNames: ["Prof. Luka Horvat", "Dr. Ana Kovač"],
    category: "climate-change",
    keywords: ["carbon flux", "eddy covariance", "temperate forests", "carbon sink", "climate variability"],
    abstract: "European temperate forests are significant carbon sinks but exhibit high interannual variability in net ecosystem productivity (NEP). We synthesized 15 years of eddy covariance measurements from 15 sites in the ICOS network spanning beech, oak, and mixed forests across a continental climate gradient. Mean annual NEP ranged from 82 to 412 g C m⁻² yr⁻¹, with interannual variability dominated by summer drought events. Our analysis reveals that drought-year NEP reduction averaged 58% below decadal mean values, and that the frequency of drought-driven NEP anomalies has more than doubled since 2005, suggesting progressive weakening of the European forest carbon sink.",
    content: [
      {
        heading: "Introduction",
        body: "Terrestrial ecosystems currently absorb approximately 30% of anthropogenic CO₂ emissions annually, with European forests contributing an estimated 0.3–0.5 Pg C yr⁻¹ to this land carbon sink. The persistence and magnitude of this sink are critical to near-term climate projections, yet are subject to large and poorly constrained interannual variability driven primarily by climate extremes.\n\nEddy covariance flux towers provide the most direct measurements of ecosystem-atmosphere CO₂ exchange, integrating photosynthetic uptake and ecosystem respiration at the landscape scale. The European network of flux towers—ICOS (Integrated Carbon Observation System)—has expanded to provide continuous measurements across the full range of European climate zones and forest types, creating an unprecedented dataset for assessing carbon flux dynamics."
      },
      {
        heading: "Methods",
        body: "We analyzed eddy covariance data from 15 ICOS forest sites for the period 2009–2024, selected to span the continental climate gradient from maritime (western France, UK) to continental (Poland, Czech Republic) conditions. Sites include beech-dominated (n=7), oak-dominated (n=4), and mixed forest (n=4) stands. Data quality filtering, gap-filling, and partitioning of net ecosystem exchange (NEE) into gross primary production (GPP) and ecosystem respiration (Reco) followed ICOS standard protocols.\n\nDrought characterization used the Standardized Precipitation Evapotranspiration Index (SPEI) at 3-month timescales, with drought years defined as those with summer (JJA) SPEI < -1.0 at the site level."
      },
      {
        heading: "Results and Discussion",
        body: "Mean annual NEP across all sites was 215 ± 89 g C m⁻² yr⁻¹, with the highest values at productive beech sites in Germany and France and lowest values at continental oak sites subject to periodic soil moisture limitation. Interannual variability was dominated by summer climate, particularly precipitation deficit and vapor pressure deficit.\n\nDrought years (SPEI < -1.0 in summer) resulted in mean NEP reductions of 58.3 ± 12.7% relative to site-specific decadal means. The frequency of summer drought events across the 15 sites increased from 1.4 events per site-decade in 2009–2016 to 3.1 events per site-decade in 2017–2024, consistent with regional drying trends."
      },
      {
        heading: "Conclusion",
        body: "Our synthesis reveals a systematic weakening of the European temperate forest carbon sink attributable to increased frequency and intensity of summer drought events—a pattern consistent with climate model projections for the region under continued greenhouse gas forcing. The doubling of drought-driven NEP anomalies since 2005 is a concerning trajectory that, if continued, could transform European forests from net carbon sinks to net sources within decades.\n\nThese findings reinforce the importance of protecting and restoring European forest ecosystems as both carbon stores and climate regulators, while improving process understanding of drought effects on forest carbon cycling to constrain future projections."
      }
    ],
    publishedDate: "2024-10-28",
    volume: 11,
    issue: 3,
    pages: "142–168",
    doi: "10.17345/jesam.2024.011",
    views: 2340,
    downloads: 670,
    citations: 16,
    readingTime: 18,
    featured: false,
    trending: false,
    hasPdf: true,
    imageColor: "from-green-600 to-teal-700",
  },
  {
    id: "art-012",
    title: "Solar Dryer Technology for Small-Scale Farmers: Reducing Post-Harvest Losses in Tropical Regions",
    slug: "solar-dryer-technology-small-scale-farmers-tropical",
    authors: ["maya-patel"],
    authorNames: ["Dr. Maya Patel"],
    category: "sustainable-agriculture",
    keywords: ["solar drying", "post-harvest losses", "food security", "appropriate technology", "smallholder farming"],
    abstract: "Post-harvest food losses in tropical developing regions average 30–40% for perishable crops, representing both a food security crisis and a significant source of greenhouse gas emissions from decomposing biomass. We evaluated the performance, adoption barriers, and economic returns of low-cost solar dryer systems across 220 smallholder farming households in three Indian states over two agricultural seasons. Optimized polycarbonate-panel solar dryers reduced post-harvest losses from 34% to 7% for leafy vegetables and from 28% to 5% for legumes, with payback periods averaging 1.3 growing seasons. Adoption barriers were primarily informational and financial rather than technical.",
    content: [
      {
        heading: "Introduction",
        body: "Food loss and waste represent one of the most significant—and most tractable—sustainability challenges of our time. Globally, approximately one-third of all food produced for human consumption is lost or wasted, with the majority of losses in developing nations occurring at the farm and post-harvest stages due to inadequate storage, transportation, and processing infrastructure.\n\nIn tropical developing regions, the combination of high temperatures, high humidity, and inadequate cold chain infrastructure creates ideal conditions for rapid microbial spoilage of harvested crops. Traditional sun drying—spreading crops on mats or rooftops exposed to direct sunlight—is widely practiced but inefficient, slow, and vulnerable to contamination by dust, insects, and sudden rainfall. Enclosed solar dryers address these limitations by creating a protected, high-temperature microenvironment that accelerates drying while maintaining hygiene."
      },
      {
        heading: "Study Design",
        body: "We worked with 220 farming households across three Indian states (Karnataka, Maharashtra, and Odisha) from October 2022 to September 2024, covering two post-monsoon agricultural seasons. Households were assigned to one of four treatment groups: no intervention (control), low-cost solar dryer provision, solar dryer plus training, and solar dryer plus training plus credit access. Solar dryers were locally fabricated from locally available materials (mild steel frame, polycarbonate cover, galvanized mesh trays) at a unit cost of approximately USD 42."
      },
      {
        heading: "Results",
        body: "Post-harvest loss rates for the primary study crops (tomato, chili, onion, and lentil) declined dramatically in all treatment groups relative to controls. The most significant reductions were observed for tomato (control: 38.4% loss; solar dryer + training + credit: 6.8% loss) and chili (control: 31.2%; treatment: 4.9%). Drying time reductions ranged from 42% (lentil) to 67% (tomato) compared to traditional sun drying.\n\nEconomic analysis showed mean payback periods of 1.3 growing seasons across the full treatment group, with net present value of dryer investment averaging USD 187 over three years at a 12% discount rate. The provision of credit access (removing upfront capital constraint) was the single most impactful intervention for adoption rates, increasing adoption from 58% to 91% among eligible households."
      },
      {
        heading: "Conclusion",
        body: "Low-cost solar dryer technology offers smallholder farmers in tropical developing regions a high-return, rapidly adoptable solution to post-harvest crop losses. Our results demonstrate that the technology itself is not the limiting factor for adoption; rather, access to initial capital and awareness of operational best practices are the primary constraints that can be addressed through targeted financial instruments and extension services.\n\nScaling solar dryer adoption across India's 100 million smallholder farming households could prevent losses of approximately 15–18 million tonnes of produce annually, with co-benefits for farmer incomes, food security, and greenhouse gas emission reductions from avoided waste decomposition."
      }
    ],
    publishedDate: "2024-09-14",
    volume: 11,
    issue: 2,
    pages: "95–121",
    doi: "10.17345/jesam.2024.012",
    views: 1640,
    downloads: 430,
    citations: 4,
    readingTime: 13,
    featured: false,
    trending: false,
    hasPdf: true,
    imageColor: "from-amber-500 to-yellow-600",
  },
];

export const getFeaturedArticles = () => articles.filter(a => a.featured);
export const getTrendingArticles = () => articles.filter(a => a.trending);
export const getLatestArticles = (limit = 6) =>
  [...articles]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
export const getArticleById = (id: string) => articles.find(a => a.id === id);
export const getArticlesByAuthor = (authorId: string) => articles.filter(a => a.authors.includes(authorId));
export const getArticlesByCategory = (categoryId: string) => articles.filter(a => a.category === categoryId);
export const getRelatedArticles = (articleId: string, limit = 4) => {
  const article = articles.find(a => a.id === articleId);
  if (!article) return [];
  return articles
    .filter(a => a.id !== articleId && (a.category === article.category || a.authors.some(au => article.authors.includes(au))))
    .slice(0, limit);
};
