#version 150

out vec4 outColor;

in vec2 texCoord;
in vec3 exNormal;
uniform sampler2D tex;

void main(void)
{
    // Texture from disc
    vec4 t = texture(tex, texCoord);

    // Calculate checkerboard pattern
    int numSquares = 1; // Number of squares per side
    float squareSize = 1.0 / float(numSquares);

    int xSquare = int(texCoord.s / squareSize);
    int ySquare = int(texCoord.t / squareSize);

    bool isDark = mod(xSquare + ySquare, 2) == 0;

    // Set colors for the checkerboard pattern
    vec3 darkColor = vec3(0.1, 0.1, 0.1);
    vec3 lightColor = vec3(0.9, 0.9, 0.9);

    // Choose color based on the square position
    vec3 checkerColor = isDark ? darkColor : lightColor;

    // Lighting calculation
    vec3 n = normalize(exNormal);
    float shade = n.y + n.z;

    // Apply the checkerboard pattern with shading
    outColor = vec4(checkerColor * shade * shade, 1.0); // Over-emphasized fake light
}


