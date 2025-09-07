import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileDown,
  HardDrive,
  Headphones,
  Laptop,
  MonitorCheck,
  Settings,
  HeadsetIcon as VrHeadset,
  Wrench,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import MetaverseNavbar from "@/components/metaverse-navbar"
import MetaverseFooter from "@/components/metaverse-footer"
import DownloadButton from "@/components/download-button"

export default function InstallationGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <MetaverseNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 bg-blue-500 hover:bg-blue-600 shadow-lg" variant="secondary">
            Setup Guide
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Faberland VR Installation Guide
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white sm:text-xl">
            Follow our step-by-step instructions to get your Faberland VR demo up and running in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <DownloadButton />
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-amber-400">System Requirements</h2>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-400">
                    <Laptop className="mr-2 h-5 w-5 text-amber-400" /> Minimum Requirements
                  </CardTitle>
                  <CardDescription>The baseline specs needed to run Faberland VR</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start">
                      <HardDrive className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>OS:</strong> Windows 10 (64-bit)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Laptop className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Processor:</strong> Intel Core i5-7500 / AMD Ryzen 5 1500X
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MonitorCheck className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Graphics:</strong> NVIDIA GTX 1060 6GB / AMD Radeon RX 580 8GB
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Settings className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Memory:</strong> 8 GB RAM
                      </span>
                    </li>
                    <li className="flex items-start">
                      <HardDrive className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Storage:</strong> 10 GB available space
                      </span>
                    </li>
                    <li className="flex items-start">
                      <VrHeadset className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>VR Headset:</strong> Oculus Rift S, HTC Vive, Valve Index, or Windows Mixed Reality
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Headphones className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Audio:</strong> Headphones with microphone recommended
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-400">
                    <Laptop className="mr-2 h-5 w-5 text-amber-400" /> Recommended Specifications
                  </CardTitle>
                  <CardDescription>For the optimal Faberland experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start">
                      <HardDrive className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>OS:</strong> Windows 10/11 (64-bit)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Laptop className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Processor:</strong> Intel Core i7-9700K / AMD Ryzen 7 3700X or better
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MonitorCheck className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Graphics:</strong> NVIDIA RTX 2070 SUPER / AMD Radeon RX 5700 XT or better
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Settings className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Memory:</strong> 16 GB RAM
                      </span>
                    </li>
                    <li className="flex items-start">
                      <HardDrive className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Storage:</strong> 10 GB available space (SSD recommended)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <VrHeadset className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>VR Headset:</strong> Oculus Quest 2 (with Link), Valve Index, or HTC Vive Pro
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Headphones className="mr-2 mt-0.5 h-4 w-4 text-zinc-400" />
                      <span>
                        <strong>Audio:</strong> High-quality headphones with microphone
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Alert className="mb-8 border-amber-500/30 bg-amber-500/10">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">Important Note</AlertTitle>
              <AlertDescription className="text-zinc-300">
                The Faberland VR demo requires a compatible VR headset. While some features can be accessed in desktop
                mode, the full immersive experience is only available in VR.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-12 bg-zinc-950">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-amber-400">Installation Steps</h2>

            <Tabs defaultValue="windows" className="w-full">
              <div className="mb-8 flex justify-center">
                <TabsList className="bg-zinc-900">
                  <TabsTrigger value="windows">Windows</TabsTrigger>
                  <TabsTrigger value="oculus">Oculus Setup</TabsTrigger>
                  <TabsTrigger value="steamvr">SteamVR Setup</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="windows" className="mt-0">
                <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
                  <CardContent className="p-6">
                    <ol className="space-y-6">
                      <InstallationStep
                        number={1}
                        title="Download the Installer"
                        description="Click the download button to get the Faberland VR demo installer package."
                        icon={<Download className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 flex justify-center">
                          <DownloadButton />
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={2}
                        title="Extract the Files"
                        description="The download is a compressed 7z archive. You'll need 7-Zip or a similar program to extract it."
                        icon={<FileDown className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Right-click on the downloaded file (Faberland_VR_Demo.7z)
                            <br />
                            2. Select "Extract All..." or use 7-Zip's "Extract to Faberland_VR_Demo\"
                            <br />
                            3. Choose a destination folder where you want to install the demo
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={3}
                        title="Run the Setup"
                        description="Navigate to the extracted folder and run the setup application."
                        icon={<Wrench className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Open the extracted folder
                            <br />
                            2. Find and run "FaberlandVRSetup.exe"
                            <br />
                            3. Follow the on-screen instructions to complete the installation
                            <br />
                            4. When prompted, select your VR headset type
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={4}
                        title="Complete Installation"
                        description="Finish the setup process and prepare to launch Faberland VR."
                        icon={<CheckCircle2 className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. The installer will create desktop shortcuts
                            <br />
                            2. Make sure your VR headset is connected and set up
                            <br />
                            3. Launch Faberland VR from the desktop shortcut or Start menu
                          </p>
                        </div>
                      </InstallationStep>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="oculus" className="mt-0">
                <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
                  <CardContent className="p-6">
                    <ol className="space-y-6">
                      <InstallationStep
                        number={1}
                        title="Oculus Software Setup"
                        description="Ensure you have the latest Oculus software installed."
                        icon={<VrHeadset className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Download and install the Oculus app from the official website
                            <br />
                            2. Set up your Oculus account if you haven't already
                            <br />
                            3. Connect your headset and complete the device setup
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={2}
                        title="Enable Unknown Sources"
                        description="Allow the Oculus software to run applications from outside the Oculus Store."
                        icon={<Settings className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Open the Oculus app on your computer
                            <br />
                            2. Go to Settings → General
                            <br />
                            3. Toggle "Unknown Sources" to enable it
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={3}
                        title="Install Faberland VR"
                        description="Follow the Windows installation steps to install the Faberland VR demo."
                        icon={<Wrench className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Complete steps 1-4 from the Windows installation guide
                            <br />
                            2. During setup, select "Oculus" as your VR platform
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={4}
                        title="Launch in VR"
                        description="Start Faberland VR with your Oculus headset."
                        icon={<CheckCircle2 className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Put on your Oculus headset
                            <br />
                            2. Launch Faberland VR from your desktop
                            <br />
                            3. The application should appear in your headset
                            <br />
                            4. If using Quest with Link, ensure Link is active before launching
                          </p>
                        </div>
                      </InstallationStep>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="steamvr" className="mt-0">
                <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
                  <CardContent className="p-6">
                    <ol className="space-y-6">
                      <InstallationStep
                        number={1}
                        title="Steam and SteamVR Setup"
                        description="Ensure you have Steam and SteamVR installed and updated."
                        icon={<VrHeadset className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Install Steam from the official website if you don't have it
                            <br />
                            2. In Steam, go to the Library and search for "SteamVR"
                            <br />
                            3. Install SteamVR and ensure it's updated to the latest version
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={2}
                        title="Set Up Your VR Headset"
                        description="Connect and configure your VR headset with SteamVR."
                        icon={<Settings className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Connect your VR headset to your computer
                            <br />
                            2. Launch SteamVR from Steam
                            <br />
                            3. Follow the setup instructions to configure your play area
                            <br />
                            4. Ensure your controllers are paired and working
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={3}
                        title="Install Faberland VR"
                        description="Follow the Windows installation steps to install the Faberland VR demo."
                        icon={<Wrench className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Complete steps 1-4 from the Windows installation guide
                            <br />
                            2. During setup, select "SteamVR" as your VR platform
                          </p>
                        </div>
                      </InstallationStep>

                      <Separator className="bg-amber-700/20" />

                      <InstallationStep
                        number={4}
                        title="Launch with SteamVR"
                        description="Start Faberland VR through SteamVR."
                        icon={<CheckCircle2 className="h-8 w-8 text-amber-400" />}
                      >
                        <div className="mt-4 rounded-md bg-zinc-800/50 p-4">
                          <p className="text-sm text-zinc-300">
                            1. Make sure SteamVR is running and your headset is connected
                            <br />
                            2. Launch Faberland VR from your desktop
                            <br />
                            3. The application should automatically open in SteamVR
                            <br />
                            4. Put on your headset to begin the experience
                          </p>
                        </div>
                      </InstallationStep>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-amber-400">Troubleshooting</h2>

            <Card className="mb-8 border-amber-700/30 bg-zinc-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-amber-400">Common Issues & Solutions</CardTitle>
                <CardDescription>
                  If you encounter problems during installation or when running Faberland VR, try these solutions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-amber-400">Installation Fails</h3>
                  <p className="mb-2 text-zinc-300">If the installation process fails or doesn't complete properly:</p>
                  <ul className="ml-6 list-disc text-zinc-400">
                    <li>Ensure you have administrator privileges on your computer</li>
                    <li>Temporarily disable antivirus software during installation</li>
                    <li>Make sure you have enough disk space (at least 10GB free)</li>
                    <li>Try extracting to a different location (avoid Program Files folders)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-amber-400">VR Headset Not Detected</h3>
                  <p className="mb-2 text-zinc-300">If Faberland VR doesn't detect your VR headset:</p>
                  <ul className="ml-6 list-disc text-zinc-400">
                    <li>Ensure your headset is properly connected and powered on</li>
                    <li>Verify that your VR platform software (Oculus, SteamVR) is running</li>
                    <li>Restart your computer and VR headset</li>
                    <li>Update your VR headset drivers and software</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-amber-400">Performance Issues</h3>
                  <p className="mb-2 text-zinc-300">If you experience lag, stuttering, or low frame rates:</p>
                  <ul className="ml-6 list-disc text-zinc-400">
                    <li>Lower the graphics settings in the Faberland VR options menu</li>
                    <li>Close other applications running in the background</li>
                    <li>Update your graphics card drivers</li>
                    <li>Ensure your computer meets at least the minimum system requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-amber-400">Audio Issues</h3>
                  <p className="mb-2 text-zinc-300">If you can't hear audio or have microphone problems:</p>
                  <ul className="ml-6 list-disc text-zinc-400">
                    <li>Check your audio settings in both Windows and your VR platform</li>
                    <li>Verify that the correct audio device is selected in Faberland VR settings</li>
                    <li>Ensure your microphone is properly connected and enabled</li>
                    <li>Restart the application after changing audio settings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold text-amber-400">Still Having Issues?</h3>
              <p className="mb-6 text-zinc-300">
                If you're still experiencing problems, please contact our support team for assistance.
              </p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">Contact Support</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black to-amber-950/20">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-amber-400">Ready to Experience Faberland?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
            Download the Faberland VR demo today and start exploring our virtual world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <DownloadButton size="lg" />
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
              asChild
            >
              <a href="/marketplace">Explore Faberplots</a>
            </Button>
          </div>
        </div>
      </section>

      <MetaverseFooter />
    </div>
  )
}

interface InstallationStepProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  children?: React.ReactNode
}

function InstallationStep({ number, title, description, icon, children }: InstallationStepProps) {
  return (
    <li className="relative pl-12">
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
        {number}
      </div>
      <div>
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <h3 className="text-xl font-bold text-amber-400">{title}</h3>
        </div>
        <p className="mt-2 text-zinc-300">{description}</p>
        {children}
      </div>
    </li>
  )
}
