"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Magic UI Components
import { Marquee } from "@/components/magicui/marquee";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DotPattern } from "@/components/magicui/dot-pattern";

// Aceternity UI Components
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { cn } from "@/lib/utils";

/**
 * Test page component to showcase all shadcn/ui components available in the project
 * AICODE-NOTE: This page demonstrates all UI components from shadcn/ui library
 */
export default function TestPage() {
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">shadcn/ui Components Test Page</h1>
        <p className="text-muted-foreground">Демонстрация всех доступных компонентов shadcn/ui</p>
      </div>

      {/* Buttons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Различные варианты кнопок</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🎯</Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Различные стили значков</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Input and Label Section */}
      <Card>
        <CardHeader>
          <CardTitle>Input & Label</CardTitle>
          <CardDescription>Поля ввода и метки</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-input">Test Input</Label>
            <Input
              id="test-input"
              type="text"
              placeholder="Введите текст..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-input">Email</Label>
            <Input
              id="email-input"
              type="email"
              placeholder="example@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-input">Password</Label>
            <Input
              id="password-input"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </CardContent>
      </Card>

      {/* Checkbox Section */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox</CardTitle>
          <CardDescription>Флажки для выбора</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="test-checkbox"
              checked={isChecked}
              onCheckedChange={setIsChecked}
            />
            <Label htmlFor="test-checkbox">
              Согласен с условиями использования
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter">
              Подписаться на рассылку
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled">
              Отключенный флажок
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Dropdown Menu Section */}
      <Card>
        <CardHeader>
          <CardTitle>Dropdown Menu</CardTitle>
          <CardDescription>Выпадающие меню</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Открыть меню</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Профиль</DropdownMenuItem>
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuItem>Биллинг</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Действия</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                <DropdownMenuItem>Копировать</DropdownMenuItem>
                <DropdownMenuItem>Переместить</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Простая карточка</CardTitle>
            <CardDescription>
              Базовая карточка с заголовком и описанием
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Содержимое карточки может включать любой контент.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Карточка с футером</CardTitle>
            <CardDescription>
              Карточка с дополнительными действиями
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Эта карточка имеет футер с кнопками действий.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Отмена</Button>
            <Button>Сохранить</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% от прошлого месяца
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Demo Section */}
      <Card>
        <CardHeader>
          <CardTitle>Интерактивная демонстрация</CardTitle>
          <CardDescription>
            Комбинация различных компонентов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Введенный текст:</Label>
              <div className="p-2 bg-muted rounded">
                {inputValue || "Пусто"}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Состояние флажка:</Label>
              <div className="p-2 bg-muted rounded">
                {isChecked ? "Отмечен" : "Не отмечен"}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={isChecked ? "default" : "secondary"}>
              {isChecked ? "Активен" : "Неактивен"}
            </Badge>
            {inputValue && (
              <Badge variant="outline">
                Длина: {inputValue.length}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Magic UI Components Section */}
      <Card>
        <CardHeader>
          <CardTitle>Magic UI Components</CardTitle>
          <CardDescription>Дополнительные анимированные компоненты</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Marquee Component */}
          <div className="space-y-2">
            <Label>Marquee (бегущая строка)</Label>
            <div className="relative overflow-hidden rounded-lg border bg-background p-4">
              <Marquee className="[--duration:20s]">
                <div className="flex gap-4">
                  <Badge>React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge variant="secondary">shadcn/ui</Badge>
                  <Badge variant="outline">Magic UI</Badge>
                </div>
              </Marquee>
            </div>
          </div>

          {/* Border Beam Component */}
          <div className="space-y-2">
            <Label>Border Beam (анимированная граница)</Label>
            <div className="relative rounded-lg border bg-background p-6">
              <BorderBeam size={250} duration={12} delay={9} />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Карточка с анимированной границей</h3>
                <p className="text-muted-foreground mt-2">Красивый эффект свечения по периметру</p>
              </div>
            </div>
          </div>

          {/* Dot Pattern Component */}
          <div className="space-y-2">
            <Label>Dot Pattern (точечный паттерн)</Label>
            <div className="relative h-32 rounded-lg border bg-background overflow-hidden">
              <DotPattern
                className={cn(
                  "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-lg font-medium">Контент поверх паттерна</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aceternity UI Components Section */}
      <Card>
        <CardHeader>
          <CardTitle>Aceternity UI Components</CardTitle>
          <CardDescription>3D эффекты и продвинутые компоненты</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 3D Card Component */}
          <div className="space-y-2">
            <Label>3D Card (трехмерная карточка)</Label>
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  3D Карточка
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  Наведите курсор для просмотра 3D эффекта
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="h-20 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium">3D Контент</span>
                  </div>
                </CardItem>
                <div className="flex justify-between items-center mt-6">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    Попробовать →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    Подписаться
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>

          {/* Background Beams Component */}
          <div className="space-y-2">
            <Label>Background Beams (фоновые лучи)</Label>
            <div className="h-40 w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased rounded-lg overflow-hidden">
              <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-lg md:text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
                  Анимированные лучи
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                  Красивый фоновый эффект с анимированными лучами света
                </p>
              </div>
              <BackgroundBeams />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Все компоненты shadcn/ui, Magic UI и Aceternity UI успешно загружены и работают!
        </p>
        <Button className="mt-4" onClick={() => window.location.href = '/'}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}