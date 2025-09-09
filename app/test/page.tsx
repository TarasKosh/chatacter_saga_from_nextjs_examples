"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Все компоненты shadcn/ui успешно загружены и работают!
        </p>
        <Button className="mt-4" onClick={() => window.location.href = '/'}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}