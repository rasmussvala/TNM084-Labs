#version 150

out vec4 outColor;

in vec2 texCoord;
in vec3 exNormal;
uniform sampler2D tex;

// Function to generate Perlin noise
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Smooth the interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0)), u.x), u.y);
}

void main(void)
{
    // Texture from disc
    vec4 t = texture(tex, texCoord);

    // Generate a marble-like pattern
    float frequency = 5.0;
    float distortion = 3.0;
    float time = 10.0;

    float xDistort = sin(texCoord.s * frequency + time) * distortion;
    float yDistort = cos(texCoord.t * frequency + time) * distortion;

    vec2 distortedCoords = vec2(texCoord.s + xDistort, texCoord.t + yDistort);

    float marble = sin(distortedCoords.s + distortedCoords.t + noise(distortedCoords) * 5.0);

    // Lighting calculation
    vec3 n = normalize(exNormal);
    float shade = n.y + n.z;

    // Apply the procedural marble pattern with shading
    outColor = vec4(vec3(marble) * shade * shade, 1.0); // Over-emphasized fake light
}

