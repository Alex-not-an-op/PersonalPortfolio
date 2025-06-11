module.exports = {
    images: {
        unoptimized: true, // thank you vercel :////////////
      },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        // Disable problematic optimizations
                        mergePaths: false,
                        cleanupGroups: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      });
  
      return config;
    },
  };
  