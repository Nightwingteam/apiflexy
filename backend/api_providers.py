"""
API Providers Configuration
Contains pre-configured settings for 50+ popular APIs
"""

API_PROVIDERS = {
    # Social Media & Communication
    "twitter": {
        "name": "Twitter API",
        "base_url": "https://api.twitter.com/2",
        "auth_type": "bearer",
        "description": "Access Twitter posts, users, and interactions",
        "endpoints": {
            "tweets": "/tweets",
            "users": "/users",
            "search": "/tweets/search/recent"
        },
        "query_patterns": {
            "tweets": ["tweet", "post", "status"],
            "users": ["user", "profile", "account"],
            "search": ["search", "find", "lookup"]
        },
        "example_queries": [
            "Get recent tweets",
            "Search for tweets about AI",
            "Get user profile information",
            "Find tweets by username"
        ]
    },
    
    "facebook": {
        "name": "Facebook Graph API",
        "base_url": "https://graph.facebook.com/v18.0",
        "auth_type": "api_key",
        "description": "Access Facebook pages, posts, and insights",
        "endpoints": {
            "me": "/me",
            "pages": "/me/accounts",
            "posts": "/{page-id}/posts"
        },
        "query_patterns": {
            "profile": ["profile", "me", "account"],
            "pages": ["page", "pages"],
            "posts": ["post", "posts", "feed"]
        }
    },
    
    "instagram": {
        "name": "Instagram Basic Display API",
        "base_url": "https://graph.instagram.com",
        "auth_type": "bearer",
        "description": "Access Instagram user media and profile",
        "endpoints": {
            "me": "/me",
            "media": "/me/media"
        }
    },
    
    "linkedin": {
        "name": "LinkedIn API",
        "base_url": "https://api.linkedin.com/v2",
        "auth_type": "bearer",
        "description": "Access LinkedIn profiles and company data",
        "endpoints": {
            "profile": "/people/(id:me)",
            "companies": "/companies"
        }
    },
    
    "discord": {
        "name": "Discord API",
        "base_url": "https://discord.com/api/v10",
        "auth_type": "bearer",
        "description": "Manage Discord servers, channels, and messages",
        "endpoints": {
            "guilds": "/users/@me/guilds",
            "channels": "/guilds/{guild_id}/channels",
            "messages": "/channels/{channel_id}/messages"
        }
    },
    
    "slack": {
        "name": "Slack Web API",
        "base_url": "https://slack.com/api",
        "auth_type": "bearer",
        "description": "Interact with Slack workspaces and channels",
        "endpoints": {
            "channels": "/conversations.list",
            "messages": "/chat.postMessage",
            "users": "/users.list"
        }
    },
    
    # Cloud Services
    "aws": {
        "name": "AWS API Gateway",
        "base_url": "https://{api-id}.execute-api.{region}.amazonaws.com",
        "auth_type": "bearer",
        "description": "Access AWS services and resources"
    },
    
    "google_cloud": {
        "name": "Google Cloud API",
        "base_url": "https://cloudresourcemanager.googleapis.com/v1",
        "auth_type": "bearer",
        "description": "Manage Google Cloud Platform resources"
    },
    
    "azure": {
        "name": "Microsoft Azure API",
        "base_url": "https://management.azure.com",
        "auth_type": "bearer",
        "description": "Manage Azure cloud resources"
    },
    
    "digitalocean": {
        "name": "DigitalOcean API",
        "base_url": "https://api.digitalocean.com/v2",
        "auth_type": "bearer",
        "description": "Manage DigitalOcean droplets and services"
    },
    
    # Development & Code
    "github": {
        "name": "GitHub API",
        "base_url": "https://api.github.com",
        "auth_type": "bearer",
        "description": "Access GitHub repositories, commits, and issues",
        "endpoints": {
            "repos": "/user/repos",
            "commits": "/repos/{owner}/{repo}/commits",
            "issues": "/repos/{owner}/{repo}/issues",
            "pulls": "/repos/{owner}/{repo}/pulls"
        },
        "query_patterns": {
            "repositories": ["repo", "repository", "repositories"],
            "commits": ["commit", "commits", "changes"],
            "issues": ["issue", "issues", "bug", "bugs"],
            "pulls": ["pull", "pr", "merge", "pull request"]
        }
    },
    
    "gitlab": {
        "name": "GitLab API",
        "base_url": "https://gitlab.com/api/v4",
        "auth_type": "api_key",
        "description": "Access GitLab projects and repositories"
    },
    
    "bitbucket": {
        "name": "Bitbucket API",
        "base_url": "https://api.bitbucket.org/2.0",
        "auth_type": "bearer",
        "description": "Manage Bitbucket repositories and pipelines"
    },
    
    "jira": {
        "name": "Jira API",
        "base_url": "https://{domain}.atlassian.net/rest/api/3",
        "auth_type": "basic",
        "description": "Manage Jira issues and projects"
    },
    
    "confluence": {
        "name": "Confluence API",
        "base_url": "https://{domain}.atlassian.net/wiki/rest/api",
        "auth_type": "basic",
        "description": "Access Confluence pages and spaces"
    },
    
    # E-commerce
    "shopify": {
        "name": "Shopify API",
        "base_url": "https://{shop}.myshopify.com/admin/api/2023-10",
        "auth_type": "api_key",
        "description": "Manage Shopify stores and products"
    },
    
    "woocommerce": {
        "name": "WooCommerce API",
        "base_url": "https://{domain}/wp-json/wc/v3",
        "auth_type": "basic",
        "description": "Manage WooCommerce products and orders"
    },
    
    "stripe": {
        "name": "Stripe API",
        "base_url": "https://api.stripe.com/v1",
        "auth_type": "bearer",
        "description": "Handle payments and billing"
    },
    
    "paypal": {
        "name": "PayPal API",
        "base_url": "https://api.paypal.com/v1",
        "auth_type": "bearer",
        "description": "Process PayPal payments"
    },
    
    "amazon": {
        "name": "Amazon Selling Partner API",
        "base_url": "https://sellingpartnerapi-na.amazon.com",
        "auth_type": "bearer",
        "description": "Access Amazon seller data"
    },
    
    # Content Management
    "wordpress": {
        "name": "WordPress REST API",
        "base_url": "https://{domain}/wp-json/wp/v2",
        "auth_type": "api_key",
        "description": "Manage WordPress posts, pages, and media",
        "endpoints": {
            "posts": "/posts",
            "pages": "/pages",
            "media": "/media",
            "users": "/users",
            "comments": "/comments"
        },
        "query_patterns": {
            "posts": ["post", "posts", "blog", "article"],
            "pages": ["page", "pages"],
            "media": ["media", "image", "file"],
            "users": ["user", "users", "author"],
            "comments": ["comment", "comments"]
        }
    },
    
    "drupal": {
        "name": "Drupal JSON:API",
        "base_url": "https://{domain}/jsonapi",
        "auth_type": "bearer",
        "description": "Access Drupal content and entities"
    },
    
    "contentful": {
        "name": "Contentful API",
        "base_url": "https://api.contentful.com/spaces/{space_id}",
        "auth_type": "bearer",
        "description": "Manage headless CMS content"
    },
    
    "strapi": {
        "name": "Strapi API",
        "base_url": "http://localhost:1337/api",
        "auth_type": "bearer",
        "description": "Access Strapi headless CMS"
    },
    
    # Weather & Location
    "openweather": {
        "name": "OpenWeatherMap API",
        "base_url": "https://api.openweathermap.org/data/2.5",
        "auth_type": "api_key",
        "description": "Get weather data and forecasts",
        "endpoints": {
            "current": "/weather",
            "forecast": "/forecast",
            "history": "/onecall/timemachine"
        },
        "query_patterns": {
            "current": ["weather", "current", "now"],
            "forecast": ["forecast", "future", "prediction"],
            "history": ["history", "past", "historical"]
        }
    },
    
    "weatherapi": {
        "name": "WeatherAPI",
        "base_url": "https://api.weatherapi.com/v1",
        "auth_type": "api_key",
        "description": "Weather data and forecasting"
    },
    
    "mapbox": {
        "name": "Mapbox API",
        "base_url": "https://api.mapbox.com",
        "auth_type": "api_key",
        "description": "Maps, geocoding, and navigation"
    },
    
    "google_maps": {
        "name": "Google Maps API",
        "base_url": "https://maps.googleapis.com/maps/api",
        "auth_type": "api_key",
        "description": "Google Maps services"
    },
    
    # Finance & Crypto
    "coinbase": {
        "name": "Coinbase API",
        "base_url": "https://api.coinbase.com/v2",
        "auth_type": "bearer",
        "description": "Cryptocurrency trading and data"
    },
    
    "binance": {
        "name": "Binance API",
        "base_url": "https://api.binance.com/api/v3",
        "auth_type": "api_key",
        "description": "Cryptocurrency exchange data"
    },
    
    "alpha_vantage": {
        "name": "Alpha Vantage API",
        "base_url": "https://www.alphavantage.co/query",
        "auth_type": "api_key",
        "description": "Stock market data and indicators"
    },
    
    "finnhub": {
        "name": "Finnhub API",
        "base_url": "https://finnhub.io/api/v1",
        "auth_type": "api_key",
        "description": "Financial market data"
    },
    
    # Email & Messaging
    "sendgrid": {
        "name": "SendGrid API",
        "base_url": "https://api.sendgrid.com/v3",
        "auth_type": "bearer",
        "description": "Email delivery service"
    },
    
    "mailchimp": {
        "name": "Mailchimp API",
        "base_url": "https://{dc}.api.mailchimp.com/3.0",
        "auth_type": "api_key",
        "description": "Email marketing automation"
    },
    
    "twilio": {
        "name": "Twilio API",
        "base_url": "https://api.twilio.com/2010-04-01",
        "auth_type": "basic",
        "description": "SMS and voice communications"
    },
    
    # Analytics & Monitoring
    "google_analytics": {
        "name": "Google Analytics API",
        "base_url": "https://analyticsreporting.googleapis.com/v4",
        "auth_type": "bearer",
        "description": "Website analytics data"
    },
    
    "mixpanel": {
        "name": "Mixpanel API",
        "base_url": "https://mixpanel.com/api/2.0",
        "auth_type": "basic",
        "description": "Product analytics platform"
    },
    
    "amplitude": {
        "name": "Amplitude API",
        "base_url": "https://amplitude.com/api/2",
        "auth_type": "basic",
        "description": "Product analytics and user behavior"
    },
    
    # Database & Storage
    "airtable": {
        "name": "Airtable API",
        "base_url": "https://api.airtable.com/v0",
        "auth_type": "bearer",
        "description": "Cloud database platform"
    },
    
    "notion": {
        "name": "Notion API",
        "base_url": "https://api.notion.com/v1",
        "auth_type": "bearer",
        "description": "Workspace and productivity platform"
    },
    
    "mongodb": {
        "name": "MongoDB Atlas API",
        "base_url": "https://cloud.mongodb.com/api/atlas/v1.0",
        "auth_type": "basic",
        "description": "MongoDB cloud database"
    },
    
    "firebase": {
        "name": "Firebase API",
        "base_url": "https://{project}.firebaseio.com",
        "auth_type": "bearer",
        "description": "Google Firebase services"
    },
    
    # Productivity & Collaboration
    "zoom": {
        "name": "Zoom API",
        "base_url": "https://api.zoom.us/v2",
        "auth_type": "bearer",
        "description": "Video conferencing platform"
    },
    
    "microsoft_graph": {
        "name": "Microsoft Graph API",
        "base_url": "https://graph.microsoft.com/v1.0",
        "auth_type": "bearer",
        "description": "Microsoft 365 services"
    },
    
    "google_workspace": {
        "name": "Google Workspace API",
        "base_url": "https://www.googleapis.com",
        "auth_type": "bearer",
        "description": "Google Workspace services"
    },
    
    "trello": {
        "name": "Trello API",
        "base_url": "https://api.trello.com/1",
        "auth_type": "api_key",
        "description": "Project management boards"
    },
    
    "asana": {
        "name": "Asana API",
        "base_url": "https://app.asana.com/api/1.0",
        "auth_type": "bearer",
        "description": "Team collaboration and project management"
    },
    
    # Media & Entertainment
    "spotify": {
        "name": "Spotify Web API",
        "base_url": "https://api.spotify.com/v1",
        "auth_type": "bearer",
        "description": "Music streaming platform"
    },
    
    "youtube": {
        "name": "YouTube Data API",
        "base_url": "https://www.googleapis.com/youtube/v3",
        "auth_type": "api_key",
        "description": "YouTube videos and channels"
    },
    
    "twitch": {
        "name": "Twitch API",
        "base_url": "https://api.twitch.tv/helix",
        "auth_type": "bearer",
        "description": "Live streaming platform"
    },
    
    # News & Information
    "newsapi": {
        "name": "News API",
        "base_url": "https://newsapi.org/v2",
        "auth_type": "api_key",
        "description": "News headlines and articles"
    },
    
    "reddit": {
        "name": "Reddit API",
        "base_url": "https://oauth.reddit.com",
        "auth_type": "bearer",
        "description": "Reddit posts and comments"
    },
    
    "wikipedia": {
        "name": "Wikipedia API",
        "base_url": "https://en.wikipedia.org/api/rest_v1",
        "auth_type": "none",
        "description": "Wikipedia articles and data"
    },
    
    # AI & Machine Learning
    "openai": {
        "name": "OpenAI API",
        "base_url": "https://api.openai.com/v1",
        "auth_type": "bearer",
        "description": "AI models and completions",
        "endpoints": {
            "completions": "/completions",
            "chat": "/chat/completions",
            "embeddings": "/embeddings",
            "images": "/images/generations"
        }
    },
    
    "deepseek": {
        "name": "DeepSeek API",
        "base_url": "https://api.deepseek.com/v1",
        "auth_type": "bearer",
        "description": "Advanced AI models for coding and reasoning",
        "endpoints": {
            "chat": "/chat/completions",
            "completions": "/completions"
        },
        "query_patterns": {
            "chat": ["chat", "conversation", "ask"],
            "code": ["code", "programming", "debug"]
        }
    },
    
    "huggingface": {
        "name": "Hugging Face API",
        "base_url": "https://api-inference.huggingface.co",
        "auth_type": "bearer",
        "description": "Machine learning models"
    },
    
    "anthropic": {
        "name": "Anthropic API",
        "base_url": "https://api.anthropic.com/v1",
        "auth_type": "api_key",
        "description": "Claude AI assistant"
    },
    
    "cohere": {
        "name": "Cohere API",
        "base_url": "https://api.cohere.ai/v1",
        "auth_type": "bearer",
        "description": "Language AI platform"
    },
    
    "stability": {
        "name": "Stability AI API",
        "base_url": "https://api.stability.ai/v1",
        "auth_type": "bearer",
        "description": "Image generation and AI art"
    },
    
    "replicate": {
        "name": "Replicate API",
        "base_url": "https://api.replicate.com/v1",
        "auth_type": "bearer",
        "description": "Run machine learning models in the cloud"
    },
    
    "perplexity": {
        "name": "Perplexity API",
        "base_url": "https://api.perplexity.ai",
        "auth_type": "bearer",
        "description": "AI-powered search and answers"
    },
    
    "together": {
        "name": "Together AI API",
        "base_url": "https://api.together.xyz/v1",
        "auth_type": "bearer",
        "description": "Open source AI models"
    },
    
    "groq": {
        "name": "Groq API",
        "base_url": "https://api.groq.com/openai/v1",
        "auth_type": "bearer",
        "description": "Ultra-fast AI inference"
    },
    
    # Gaming & Entertainment
    "steam": {
        "name": "Steam Web API",
        "base_url": "https://api.steampowered.com",
        "auth_type": "api_key",
        "description": "Steam gaming platform data"
    },
    
    "riot_games": {
        "name": "Riot Games API",
        "base_url": "https://americas.api.riotgames.com",
        "auth_type": "api_key",
        "description": "League of Legends and other Riot games"
    },
    
    "rawg": {
        "name": "RAWG Video Games API",
        "base_url": "https://api.rawg.io/api",
        "auth_type": "api_key",
        "description": "Video game database"
    },
    
    "twitch_clips": {
        "name": "Twitch Clips API",
        "base_url": "https://api.twitch.tv/helix/clips",
        "auth_type": "bearer",
        "description": "Twitch gaming clips and highlights"
    },
    
    # Travel & Transportation
    "amadeus": {
        "name": "Amadeus Travel API",
        "base_url": "https://api.amadeus.com/v2",
        "auth_type": "bearer",
        "description": "Flight and hotel booking data"
    },
    
    "skyscanner": {
        "name": "Skyscanner API",
        "base_url": "https://partners.api.skyscanner.net",
        "auth_type": "api_key",
        "description": "Flight search and booking"
    },
    
    "uber": {
        "name": "Uber API",
        "base_url": "https://api.uber.com/v1.2",
        "auth_type": "bearer",
        "description": "Ride-sharing and delivery services"
    },
    
    "lyft": {
        "name": "Lyft API",
        "base_url": "https://api.lyft.com/v1",
        "auth_type": "bearer",
        "description": "Ride-sharing platform"
    },
    
    "airbnb": {
        "name": "Airbnb API",
        "base_url": "https://api.airbnb.com/v2",
        "auth_type": "bearer",
        "description": "Vacation rental platform"
    },
    
    # Food & Delivery
    "doordash": {
        "name": "DoorDash API",
        "base_url": "https://openapi.doordash.com",
        "auth_type": "bearer",
        "description": "Food delivery platform"
    },
    
    "grubhub": {
        "name": "Grubhub API",
        "base_url": "https://api-gtm.grubhub.com/restaurants",
        "auth_type": "api_key",
        "description": "Food ordering and delivery"
    },
    
    "yelp": {
        "name": "Yelp Fusion API",
        "base_url": "https://api.yelp.com/v3",
        "auth_type": "bearer",
        "description": "Restaurant and business reviews"
    },
    
    "zomato": {
        "name": "Zomato API",
        "base_url": "https://developers.zomato.com/api/v2.1",
        "auth_type": "api_key",
        "description": "Restaurant discovery and reviews"
    },
    
    # Health & Fitness
    "fitbit": {
        "name": "Fitbit API",
        "base_url": "https://api.fitbit.com/1",
        "auth_type": "bearer",
        "description": "Fitness tracking and health data"
    },
    
    "strava": {
        "name": "Strava API",
        "base_url": "https://www.strava.com/api/v3",
        "auth_type": "bearer",
        "description": "Athletic activity tracking"
    },
    
    "myfitnesspal": {
        "name": "MyFitnessPal API",
        "base_url": "https://api.myfitnesspal.com/v2",
        "auth_type": "bearer",
        "description": "Nutrition and calorie tracking"
    },
    
    "apple_health": {
        "name": "Apple HealthKit API",
        "base_url": "https://developer.apple.com/health-fitness",
        "auth_type": "bearer",
        "description": "iOS health and fitness data"
    },
    
    # Education & Learning
    "coursera": {
        "name": "Coursera API",
        "base_url": "https://api.coursera.org/api",
        "auth_type": "bearer",
        "description": "Online course platform"
    },
    
    "udemy": {
        "name": "Udemy API",
        "base_url": "https://www.udemy.com/api-2.0",
        "auth_type": "basic",
        "description": "Online learning marketplace"
    },
    
    "khan_academy": {
        "name": "Khan Academy API",
        "base_url": "https://www.khanacademy.org/api/v1",
        "auth_type": "bearer",
        "description": "Free educational content"
    },
    
    "edx": {
        "name": "edX API",
        "base_url": "https://api.edx.org/api",
        "auth_type": "bearer",
        "description": "Massive open online courses"
    },
    
    # Real Estate
    "zillow": {
        "name": "Zillow API",
        "base_url": "https://api.bridgedataoutput.com/api/v2",
        "auth_type": "api_key",
        "description": "Real estate listings and data"
    },
    
    "realtor": {
        "name": "Realtor.com API",
        "base_url": "https://api.realtor.com",
        "auth_type": "api_key",
        "description": "Property listings and market data"
    },
    
    "rentspree": {
        "name": "RentSpree API",
        "base_url": "https://api.rentspree.com/v1",
        "auth_type": "bearer",
        "description": "Rental property management"
    },
    
    # Job & Career
    "indeed": {
        "name": "Indeed API",
        "base_url": "https://api.indeed.com/ads",
        "auth_type": "api_key",
        "description": "Job search platform"
    },
    
    "linkedin_jobs": {
        "name": "LinkedIn Jobs API",
        "base_url": "https://api.linkedin.com/v2/jobs",
        "auth_type": "bearer",
        "description": "Professional job listings"
    },
    
    "glassdoor": {
        "name": "Glassdoor API",
        "base_url": "https://api.glassdoor.com/api",
        "auth_type": "api_key",
        "description": "Company reviews and salaries"
    },
    
    "angellist": {
        "name": "AngelList API",
        "base_url": "https://api.angel.co/1",
        "auth_type": "bearer",
        "description": "Startup and investment platform"
    },
    
    # Legal & Government
    "court_listener": {
        "name": "CourtListener API",
        "base_url": "https://www.courtlistener.com/api/rest/v3",
        "auth_type": "api_key",
        "description": "Legal case database"
    },
    
    "regulations_gov": {
        "name": "Regulations.gov API",
        "base_url": "https://api.regulations.gov/v4",
        "auth_type": "api_key",
        "description": "Federal government regulations"
    },
    
    "congress_gov": {
        "name": "Congress.gov API",
        "base_url": "https://api.congress.gov/v3",
        "auth_type": "api_key",
        "description": "Congressional data and legislation"
    },
    
    # IoT & Hardware
    "arduino": {
        "name": "Arduino IoT Cloud API",
        "base_url": "https://api2.arduino.cc/iot/v2",
        "auth_type": "bearer",
        "description": "IoT device management"
    },
    
    "particle": {
        "name": "Particle Cloud API",
        "base_url": "https://api.particle.io/v1",
        "auth_type": "bearer",
        "description": "IoT platform for devices"
    },
    
    "thingspeak": {
        "name": "ThingSpeak API",
        "base_url": "https://api.thingspeak.com",
        "auth_type": "api_key",
        "description": "IoT analytics platform"
    },
    
    # Blockchain & Crypto
    "etherscan": {
        "name": "Etherscan API",
        "base_url": "https://api.etherscan.io/api",
        "auth_type": "api_key",
        "description": "Ethereum blockchain explorer"
    },
    
    "blockchain_info": {
        "name": "Blockchain.info API",
        "base_url": "https://blockchain.info/api",
        "auth_type": "none",
        "description": "Bitcoin blockchain data"
    },
    
    "coingecko": {
        "name": "CoinGecko API",
        "base_url": "https://api.coingecko.com/api/v3",
        "auth_type": "none",
        "description": "Cryptocurrency market data"
    },
    
    "coinmarketcap": {
        "name": "CoinMarketCap API",
        "base_url": "https://pro-api.coinmarketcap.com/v1",
        "auth_type": "api_key",
        "description": "Crypto market capitalization data"
    },
    
    "moralis": {
        "name": "Moralis Web3 API",
        "base_url": "https://deep-index.moralis.io/api/v2",
        "auth_type": "api_key",
        "description": "Web3 and blockchain development"
    },
    
    # Design & Creative
    "figma": {
        "name": "Figma API",
        "base_url": "https://api.figma.com/v1",
        "auth_type": "bearer",
        "description": "Design collaboration platform"
    },
    
    "canva": {
        "name": "Canva API",
        "base_url": "https://api.canva.com/rest",
        "auth_type": "bearer",
        "description": "Graphic design platform"
    },
    
    "adobe_creative": {
        "name": "Adobe Creative SDK",
        "base_url": "https://api.adobe.io",
        "auth_type": "bearer",
        "description": "Adobe creative tools and services"
    },
    
    "dribbble": {
        "name": "Dribbble API",
        "base_url": "https://api.dribbble.com/v2",
        "auth_type": "bearer",
        "description": "Design portfolio platform"
    },
    
    "behance": {
        "name": "Behance API",
        "base_url": "https://api.behance.net/v2",
        "auth_type": "api_key",
        "description": "Creative portfolio showcase"
    },
    
    # Marketing & SEO
    "google_ads": {
        "name": "Google Ads API",
        "base_url": "https://googleads.googleapis.com",
        "auth_type": "bearer",
        "description": "Google advertising platform"
    },
    
    "facebook_ads": {
        "name": "Facebook Marketing API",
        "base_url": "https://graph.facebook.com/v18.0",
        "auth_type": "bearer",
        "description": "Facebook advertising platform"
    },
    
    "semrush": {
        "name": "SEMrush API",
        "base_url": "https://api.semrush.com",
        "auth_type": "api_key",
        "description": "SEO and marketing analytics"
    },
    
    "moz": {
        "name": "Moz API",
        "base_url": "https://lsapi.seomoz.com/v2",
        "auth_type": "basic",
        "description": "SEO tools and link data"
    },
    
    "ahrefs": {
        "name": "Ahrefs API",
        "base_url": "https://apiv2.ahrefs.com",
        "auth_type": "bearer",
        "description": "SEO and backlink analysis"
    },
    
    # Communication & Chat
    "telegram": {
        "name": "Telegram Bot API",
        "base_url": "https://api.telegram.org/bot",
        "auth_type": "api_key",
        "description": "Telegram messaging bot platform"
    },
    
    "whatsapp": {
        "name": "WhatsApp Business API",
        "base_url": "https://graph.facebook.com/v18.0",
        "auth_type": "bearer",
        "description": "WhatsApp business messaging"
    },
    
    "line": {
        "name": "LINE Messaging API",
        "base_url": "https://api.line.me/v2",
        "auth_type": "bearer",
        "description": "LINE messenger platform"
    },
    
    "viber": {
        "name": "Viber API",
        "base_url": "https://chatapi.viber.com/pa",
        "auth_type": "api_key",
        "description": "Viber messaging platform"
    },
    
    # Music & Audio
    "soundcloud": {
        "name": "SoundCloud API",
        "base_url": "https://api.soundcloud.com",
        "auth_type": "bearer",
        "description": "Audio sharing platform"
    },
    
    "apple_music": {
        "name": "Apple Music API",
        "base_url": "https://api.music.apple.com/v1",
        "auth_type": "bearer",
        "description": "Apple's music streaming service"
    },
    
    "lastfm": {
        "name": "Last.fm API",
        "base_url": "https://ws.audioscrobbler.com/2.0",
        "auth_type": "api_key",
        "description": "Music tracking and recommendations"
    },
    
    "bandcamp": {
        "name": "Bandcamp API",
        "base_url": "https://bandcamp.com/api",
        "auth_type": "none",
        "description": "Independent music platform"
    },
    
    # Video & Streaming
    "vimeo": {
        "name": "Vimeo API",
        "base_url": "https://api.vimeo.com",
        "auth_type": "bearer",
        "description": "Video hosting platform"
    },
    
    "dailymotion": {
        "name": "Dailymotion API",
        "base_url": "https://www.dailymotion.com/api",
        "auth_type": "bearer",
        "description": "Video sharing platform"
    },
    
    "netflix": {
        "name": "Netflix API",
        "base_url": "https://api.netflix.com",
        "auth_type": "bearer",
        "description": "Streaming entertainment service"
    },
    
    # Photography
    "unsplash": {
        "name": "Unsplash API",
        "base_url": "https://api.unsplash.com",
        "auth_type": "bearer",
        "description": "Free high-quality photos"
    },
    
    "pexels": {
        "name": "Pexels API",
        "base_url": "https://api.pexels.com/v1",
        "auth_type": "api_key",
        "description": "Free stock photos and videos"
    },
    
    "pixabay": {
        "name": "Pixabay API",
        "base_url": "https://pixabay.com/api",
        "auth_type": "api_key",
        "description": "Free images and media"
    },
    
    "shutterstock": {
        "name": "Shutterstock API",
        "base_url": "https://api.shutterstock.com/v2",
        "auth_type": "basic",
        "description": "Stock photos and media licensing"
    },
    
    # Weather & Climate
    "accuweather": {
        "name": "AccuWeather API",
        "base_url": "https://dataservice.accuweather.com",
        "auth_type": "api_key",
        "description": "Weather forecasting service"
    },
    
    "weather_underground": {
        "name": "Weather Underground API",
        "base_url": "https://api.weather.com/v1",
        "auth_type": "api_key",
        "description": "Local weather conditions"
    },
    
    "climate_data": {
        "name": "Climate Data API",
        "base_url": "https://climatedata.ca/api/v1",
        "auth_type": "api_key",
        "description": "Historical climate information"
    },
    
    # Miscellaneous & Utilities
    "qr_server": {
        "name": "QR Server API",
        "base_url": "https://api.qrserver.com/v1",
        "auth_type": "none",
        "description": "QR code generation service"
    },
    
    "ipinfo": {
        "name": "IPinfo API",
        "base_url": "https://ipinfo.io",
        "auth_type": "bearer",
        "description": "IP address geolocation data"
    },
    
    "random_user": {
        "name": "Random User API",
        "base_url": "https://randomuser.me/api",
        "auth_type": "none",
        "description": "Generate random user data"
    },
    
    "placeholder": {
        "name": "JSONPlaceholder API",
        "base_url": "https://jsonplaceholder.typicode.com",
        "auth_type": "none",
        "description": "Fake JSON data for testing"
    }
}

def get_api_provider(provider_key):
    """Get API provider configuration by key"""
    return API_PROVIDERS.get(provider_key.lower())

def get_all_providers():
    """Get all available API providers"""
    return API_PROVIDERS

def search_providers(query):
    """Search providers by name or description"""
    query = query.lower()
    results = []
    for key, provider in API_PROVIDERS.items():
        if (query in provider['name'].lower() or 
            query in provider['description'].lower() or
            query in key):
            results.append({
                'key': key,
                'name': provider['name'],
                'description': provider['description']
            })
    return results

def get_provider_categories():
    """Get providers organized by category"""
    categories = {
        "AI & Machine Learning": ["openai", "deepseek", "huggingface", "anthropic", "cohere", "stability", "replicate", "perplexity", "together", "groq"],
        "Social Media & Communication": ["twitter", "facebook", "instagram", "linkedin", "discord", "slack", "telegram", "whatsapp", "line", "viber"],
        "Cloud Services": ["aws", "google_cloud", "azure", "digitalocean"],
        "Development & Code": ["github", "gitlab", "bitbucket", "jira", "confluence"],
        "E-commerce": ["shopify", "woocommerce", "stripe", "paypal", "amazon"],
        "Content Management": ["wordpress", "drupal", "contentful", "strapi"],
        "Weather & Location": ["openweather", "weatherapi", "mapbox", "google_maps", "accuweather", "weather_underground", "climate_data"],
        "Finance & Crypto": ["coinbase", "binance", "alpha_vantage", "finnhub", "etherscan", "blockchain_info", "coingecko", "coinmarketcap", "moralis"],
        "Email & Messaging": ["sendgrid", "mailchimp", "twilio"],
        "Analytics & Monitoring": ["google_analytics", "mixpanel", "amplitude"],
        "Database & Storage": ["airtable", "notion", "mongodb", "firebase"],
        "Productivity & Collaboration": ["zoom", "microsoft_graph", "google_workspace", "trello", "asana"],
        "Media & Entertainment": ["spotify", "youtube", "twitch", "soundcloud", "apple_music", "lastfm", "bandcamp", "vimeo", "dailymotion", "netflix"],
        "News & Information": ["newsapi", "reddit", "wikipedia"],
        "Gaming & Entertainment": ["steam", "riot_games", "rawg", "twitch_clips"],
        "Travel & Transportation": ["amadeus", "skyscanner", "uber", "lyft", "airbnb"],
        "Food & Delivery": ["doordash", "grubhub", "yelp", "zomato"],
        "Health & Fitness": ["fitbit", "strava", "myfitnesspal", "apple_health"],
        "Education & Learning": ["coursera", "udemy", "khan_academy", "edx"],
        "Real Estate": ["zillow", "realtor", "rentspree"],
        "Job & Career": ["indeed", "linkedin_jobs", "glassdoor", "angellist"],
        "Legal & Government": ["court_listener", "regulations_gov", "congress_gov"],
        "IoT & Hardware": ["arduino", "particle", "thingspeak"],
        "Design & Creative": ["figma", "canva", "adobe_creative", "dribbble", "behance"],
        "Marketing & SEO": ["google_ads", "facebook_ads", "semrush", "moz", "ahrefs"],
        "Photography": ["unsplash", "pexels", "pixabay", "shutterstock"],
        "Utilities": ["qr_server", "ipinfo", "random_user", "placeholder"]
    }
    return categories 