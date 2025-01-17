<?php

use JobMetric\Domi\Enums\PageTypeEnum;
use JobMetric\Domi\Facades\Domi;

if (!function_exists('DomiSiteName')) {
    /**
     * set site name for title tag
     *
     * @param string|null $siteName
     * @return void
     */
    function DomiSiteName(string|null $siteName): void
    {
        Domi::setSiteName($siteName);
    }
}

if (!function_exists('DomiTitle')) {
    /**
     * set title for title tag
     *
     * @param string|null $title
     * @return void
     */
    function DomiTitle(string|null $title): void
    {
        Domi::setTitle($title);
    }
}

if (!function_exists('DomiDescription')) {
    /**
     * set description for description meta tag
     *
     * @param string|null $description
     * @return void
     */
    function DomiDescription(string|null $description): void
    {
        Domi::setDescription($description);
    }
}

if (!function_exists('DomiKeywords')) {
    /**
     * set keywords for keywords meta tag
     *
     * @param string|null $keywords
     * @return void
     */
    function DomiKeywords(string|null $keywords): void
    {
        Domi::setKeywords($keywords);
    }
}

if (!function_exists('DomiImage')) {
    /**
     * set image for page
     *
     * @param string|null $url
     * @return void
     */
    function DomiImage(string|null $url): void
    {
        Domi::setImage($url);
    }
}

if (!function_exists('DomiAuthor')) {
    /**
     * set author for author meta tag
     *
     * @param string|null $author
     * @return void
     */
    function DomiAuthor(string|null $author): void
    {
        Domi::setAuthor($author);
    }
}

if (!function_exists('DomiCanonical')) {
    /**
     * set canonical url for canonical meta tag
     *
     * @param string|null $url
     * @return void
     */
    function DomiCanonical(string|null $url): void
    {
        Domi::setCanonical($url);
    }
}

if (!function_exists('DomiRobots')) {
    /**
     * set robots data for robots meta tag
     *
     * @param string|null $robots
     * @return void
     */
    function DomiRobots(string|null $robots): void
    {
        Domi::setRobots($robots);
    }
}

if (!function_exists('DomiLink')) {
    /**
     * set link data for link tag
     *
     * @param string $rel
     * @param string $href
     * @param array $items
     * @return void
     */
    function DomiLink(string $rel, string $href, array $items = []): void
    {
        Domi::setLink($rel, $href, $items);
    }
}

if (!function_exists('DomiStyle')) {
    /**
     * set style data for style tag
     *
     * @param string $href
     * @param string|null $media
     * @param string|null $integrity
     * @param string|null $crossOrigin
     * @return void
     */
    function DomiStyle(string $href, string $media = null, string $integrity = null, string $crossOrigin = null): void
    {
        Domi::setStyle($href, $media, $integrity, $crossOrigin);
    }
}

if (!function_exists('DomiScript')) {
    /**
     * set script data for script tag
     *
     * @param string $src
     * @param string $type
     * @param boolean $async
     * @param boolean $defer
     * @param string $position
     * @return void
     */
    function DomiScript(string $src, string $type = 'application/javascript', bool $async = false, bool $defer = false, string $position = 'bottom'): void
    {
        Domi::setScript($src, $type, $async, $defer, $position);
    }
}

if (!function_exists('DomiLocalize')) {
    /**
     * set localize data for localize script variable
     *
     * @param string|null $key
     * @param array|string $l10n
     * @return void
     */
    function DomiLocalize(string $key = null, array|string $l10n = []): void
    {
        Domi::setLocalize($key, $l10n);
    }
}

if (!function_exists('DomiPlugins')) {
    /**
     * set plugins by parameters
     *
     * @param mixed ...$parameters
     * @return void
     */
    function DomiPlugins(...$parameters): void
    {
        Domi::setPlugins($parameters);
    }
}

if (!function_exists('DomiTemplate')) {
    /**
     * set template name
     *
     * @param string|null $template
     * @return void
     */
    function DomiTemplate(string|null $template): void
    {
        Domi::setTemplate($template);
    }
}

if (!function_exists('DomiLogo')) {
    /**
     * set logo path
     *
     * @param string|null $logo
     * @return void
     */
    function DomiLogo(string|null $logo): void
    {
        Domi::setLogo($logo);
    }
}

if (!function_exists('DomiFavicon')) {
    /**
     * set favicon path
     *
     * @param string|null $favicon
     * @return void
     */
    function DomiFavicon(string|null $favicon): void
    {
        Domi::setFavicon($favicon);
    }
}

if (!function_exists('DomiThemeColor')) {
    /**
     * set theme color for theme-color meta tag in mobile browsers
     *
     * @param string|null $color
     * @return void
     */
    function DomiThemeColor(string|null $color): void
    {
        Domi::setThemeColor($color);
    }
}

if (!function_exists('DomiPageType')) {
    /**
     * set page type for og:type meta tag
     * @param string|null $type
     * @return void
     * @see PageTypeEnum
     */
    function DomiPageType(string|null $type = 'website'): void
    {
        Domi::setPageType($type);
    }
}

if (!function_exists('DomiFooterContent')) {
    /**
     * set footer content
     *
     * @param string|null $content
     * @param string $key
     *
     * @return void
     */
    function DomiFooterContent(string|null $content = null, string $key = 'default'): void
    {
        Domi::setFooterContent($content, $key);
    }
}

if (!function_exists('DomiForgetFooterContent')) {
    /**
     * forget footer content
     *
     * @param string $key
     *
     * @return void
     */
    function DomiForgetFooterContent(string $key): void
    {
        Domi::forgetFooterContent($key);
    }
}

if (!function_exists('DomiAddModal')) {
    /**
     * add modal
     *
     * @param string $id
     * @param string|null $title
     * @param string|null $content
     * @param string|null $footer
     * @param array $options
     *
     * @return void
     * @throws Throwable
     */
    function DomiAddModal(string $id, string $title = null, string $content = null, string $footer = null, array $options = []): void
    {
        Domi::addModal($id, $title, $content, $footer, $options);
    }
}
