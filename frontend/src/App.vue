<template>
    <v-app id="app">
        <v-app-bar
                app
                color="white"
                flat
        >
            <v-container class="py-0 fill-height">
                <v-avatar
                        class="mr-10"
                        color="grey darken-1"
                        size="32"
                ></v-avatar>

                <v-btn
                        v-for="link in links"
                        :key="link"
                        text
                >
                    {{ link }}
                </v-btn>

                <v-spacer></v-spacer>

                <v-responsive max-width="260">
                    <v-text-field
                            dense
                            flat
                            hide-details
                            rounded
                            solo-inverted
                    ></v-text-field>
                </v-responsive>
            </v-container>
        </v-app-bar>

        <v-main class="grey lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list color="transparent">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <router-link to="/">Main</router-link>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <router-link to="/graph">Graph</router-link>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <router-link to="/upload">Upload</router-link>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet
                                min-height="70vh"
                                rounded="lg"
                        >
                            <router-view> </router-view>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
  data: () => ({
    statisticsResult: null,
    links: [
      'Statistics'
    ]
  })

}
</script>

<style>
</style>
