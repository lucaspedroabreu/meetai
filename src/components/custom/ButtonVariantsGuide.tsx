"use client";

import {
  PhoneCall,
  PhoneOff,
  Video,
  VideoOff,
  Calendar,
  CalendarPlus,
  CalendarClock,
  Bot,
  Sparkles,
  MessageSquare,
  Trash2,
  UserMinus,
  FileX,
  Info,
  AlertCircle,
  HelpCircle,
  Wifi,
  WifiOff,
  LogOut,
  XCircle,
  Clock,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ButtonVariantsGuide() {
  return (
    <div className="container py-10 space-y-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Button Variants Guide</h1>
        <p className="text-muted-foreground text-lg">
          Semantic button variants for Meeting SaaS applications
        </p>
      </div>

      {/* Call Variant */}
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-4 rounded bg-green-500" />
            Call Variant
          </CardTitle>
          <CardDescription>
            For initiating calls, joining meetings, and positive connection
            actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="call" size="lg">
              <PhoneCall />
              Start Call
            </Button>
            <Button variant="call">
              <Video />
              Join Meeting
            </Button>
            <Button variant="call" size="sm">
              <Wifi />
              Connect Audio
            </Button>
          </div>
          <Alert>
            <AlertDescription>
              Use for any action that <strong>starts or joins</strong> a
              communication session. Green universally signals "go" or "start".
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Leave Variant */}
      <Card className="border-orange-200 dark:border-orange-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-4 rounded bg-gradient-to-r from-orange-500 to-red-500" />
            Leave Variant
          </CardTitle>
          <CardDescription>
            For exiting meetings, ending calls, or disconnecting
            (non-destructive)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="leave">
              <PhoneOff />
              Leave Meeting
            </Button>
            <Button variant="leave" size="sm">
              <LogOut />
              Exit Room
            </Button>
            <Button variant="leave">
              <VideoOff />
              End Call
            </Button>
            <Button variant="leave" size="sm">
              <WifiOff />
              Disconnect
            </Button>
          </div>
          <Alert>
            <AlertDescription>
              Orange-to-red gradient indicates <strong>ending a session</strong>{" "}
              without destroying data. Less severe than destructive actions.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Destructive Variant */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-4 rounded bg-red-600" />
            Destructive Variant
          </CardTitle>
          <CardDescription>
            For permanent deletions and irreversible actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="destructive">
              <Trash2 />
              Delete Recording
            </Button>
            <Button variant="destructive" size="sm">
              <UserMinus />
              Remove User
            </Button>
            <Button variant="destructive">
              <FileX />
              Delete Meeting
            </Button>
            <Button variant="destructive" size="sm">
              <XCircle />
              Cancel Subscription
            </Button>
          </div>
          <Alert className="border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              Solid red for <strong>permanent, irreversible actions</strong>.
              Always confirm these actions with a dialog.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Calendar Variant */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-4 rounded bg-gradient-to-r from-primary to-primary/80" />
            Calendar Variant
          </CardTitle>
          <CardDescription>
            For scheduling, calendar events, and time-related actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="calendar" size="lg" glow>
              <CalendarPlus />
              Schedule Meeting
            </Button>
            <Button variant="calendar">
              <CalendarClock />
              Set Reminder
            </Button>
            <Button variant="calendar" size="sm">
              <Calendar />
              View Calendar
            </Button>
            <Button variant="calendar">
              <Clock />
              Reschedule
            </Button>
          </div>
          <Alert>
            <AlertDescription>
              Purple (your primary color) for{" "}
              <strong>planning and scheduling</strong> actions. The gradient
              effect makes these CTAs stand out.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* AI Variant */}
      <Card className="border-primary/10 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-4 rounded bg-gradient-to-br from-accent/40 via-primary/40 to-secondary/40" />
            AI Variant
          </CardTitle>
          <CardDescription>
            For AI-powered features and intelligent assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="ai" size="lg">
              <Bot />
              AI Assistant
            </Button>
            <Button variant="ai">
              <Sparkles />
              Generate Summary
            </Button>
            <Button variant="ai">
              <MessageSquare />
              Smart Transcription
            </Button>
            <Button variant="ai" size="sm">
              <Settings />
              AI Settings
            </Button>
          </div>
          <Alert className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <AlertDescription>
              Translucent gradient for <strong>AI and smart features</strong>.
              The ethereal appearance suggests advanced technology.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Info Variant */}
      <Card className="border-blue-200 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-4 rounded bg-blue-500" />
            Info Variant
          </CardTitle>
          <CardDescription>
            For informational actions, help, and non-critical notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="info">
              <Info />
              Meeting Details
            </Button>
            <Button variant="info" size="sm">
              <HelpCircle />
              Get Help
            </Button>
            <Button variant="info">
              <AlertCircle />
              View Guidelines
            </Button>
          </div>
          <Alert>
            <AlertDescription>
              Blue for <strong>informational and helpful</strong> actions.
              Non-urgent, supportive features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Warning Variant */}
      <Card className="border-yellow-200 dark:border-yellow-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-4 rounded bg-gradient-to-r from-yellow-500 to-amber-500" />
            Warning Variant
          </CardTitle>
          <CardDescription>
            For alerts, cautions, and degraded states
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="warning" size="sm">
              <WifiOff />
              Poor Connection
            </Button>
            <Button variant="warning">
              <AlertCircle />
              Limited Features
            </Button>
            <Button variant="warning" size="sm">
              <Clock />
              Expiring Soon
            </Button>
          </div>
          <Alert>
            <AlertDescription>
              Yellow-amber gradient for{" "}
              <strong>warnings and degraded states</strong>. Draws attention
              without alarming users.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-World Usage Examples</CardTitle>
          <CardDescription>
            Common patterns in meeting interfaces
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pre-Meeting */}
          <div>
            <h3 className="font-medium mb-3">Pre-Meeting Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="call" size="lg">
                <Video />
                Join Meeting
              </Button>
              <Button variant="calendar">
                <CalendarClock />
                Schedule for Later
              </Button>
              <Button variant="info" size="sm">
                <Settings />
                Audio/Video Settings
              </Button>
            </div>
          </div>

          {/* In-Meeting */}
          <div>
            <h3 className="font-medium mb-3">During Meeting</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="ai">
                <Bot />
                AI Assistant
              </Button>
              <Button variant="warning" size="sm">
                <WifiOff />
                Connection Issues
              </Button>
              <Button variant="leave">
                <PhoneOff />
                Leave Meeting
              </Button>
            </div>
          </div>

          {/* Post-Meeting */}
          <div>
            <h3 className="font-medium mb-3">After Meeting</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="ai">
                <Sparkles />
                View AI Summary
              </Button>
              <Button variant="calendar">
                <CalendarPlus />
                Schedule Follow-up
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 />
                Delete Recording
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <code className="text-green-600">call</code> - Start/Join
                actions
              </div>
              <div>
                <code className="text-orange-600">leave</code> - Exit/End
                session
              </div>
              <div>
                <code className="text-red-600">destructive</code> - Delete
                permanently
              </div>
              <div>
                <code className="text-primary">calendar</code> - Schedule/Time
                actions
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <code className="text-purple-600">ai</code> - Smart features
              </div>
              <div>
                <code className="text-blue-600">info</code> - Help/Details
              </div>
              <div>
                <code className="text-yellow-600">warning</code> - Alerts/Issues
              </div>
              <div>
                <code className="text-slate-600">default/ghost/outline</code> -
                Secondary actions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
